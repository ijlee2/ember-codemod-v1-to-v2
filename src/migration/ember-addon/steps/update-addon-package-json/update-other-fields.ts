import type { Context, Options, PackageJson } from '../../../../types/index.js';

type Data = {
  hasPublicAssets: boolean;
  hasTypeScript: boolean;
  publicAssetMapping: Record<string, string>;
};

function updateEmberAddon(packageJson: PackageJson, data: Data): void {
  const { hasPublicAssets, publicAssetMapping } = data;

  if (!hasPublicAssets) {
    packageJson['ember-addon'] = {
      'app-js': {},
      main: 'addon-main.cjs',
      type: 'addon',
      version: 2,
    };

    return;
  }

  packageJson['ember-addon'] = {
    'app-js': {},
    main: 'addon-main.cjs',
    'public-assets': publicAssetMapping,
    type: 'addon',
    version: 2,
  };
}

function updateExports(packageJson: PackageJson, data: Data): void {
  const { hasTypeScript } = data;

  if (!hasTypeScript) {
    packageJson['exports'] = {
      '.': './dist/index.js',
      './*': './dist/*.js',
      './addon-main.js': './addon-main.cjs',
    };

    return;
  }

  packageJson['exports'] = {
    '.': {
      types: './declarations/index.d.ts',
      default: './dist/index.js',
    },
    './*': {
      /*
        This object has an order dependency. The `default` key must appear last.
      */
      types: './declarations/*.d.ts',
      default: './dist/*.js',
    },
    './addon-main.js': './addon-main.cjs',
  };
}

function updateFiles(packageJson: PackageJson, data: Data): void {
  const { hasPublicAssets, hasTypeScript } = data;

  const files = new Set(['addon-main.cjs', 'dist']);

  if (hasPublicAssets) {
    files.add('public');
  }

  if (hasTypeScript) {
    files.add('declarations');
  }

  packageJson['files'] = Array.from(files).sort();
}

function updateTypesVersions(packageJson: PackageJson, data: Data): void {
  const { hasTypeScript } = data;

  if (!hasTypeScript) {
    return;
  }

  packageJson['typesVersions'] = {
    '*': {
      '*': ['declarations/*'],
    },
  };
}

export function updateOtherFields(
  packageJson: PackageJson,
  context: Context,
  options: Options,
): void {
  const { packages } = options;

  const publicAssetMapping = context.addon.publicAssets.reduce(
    (accumulator, filePath) => {
      const from = `./public/${filePath}`;
      const to = `/${packages.addon.name}/${filePath}`;

      accumulator[from] = to;

      return accumulator;
    },
    {} as Record<string, string>,
  );

  const hasPublicAssets = Object.keys(publicAssetMapping).length > 0;

  const data = {
    hasPublicAssets,
    hasTypeScript: packages.addon.hasTypeScript,
    publicAssetMapping,
  };

  updateEmberAddon(packageJson, data);
  updateExports(packageJson, data);
  updateFiles(packageJson, data);
  updateTypesVersions(packageJson, data);
}
