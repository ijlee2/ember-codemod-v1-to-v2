import type { Context, Options, PackageJson } from '../../types/index.js';

type Data = {
  hasBlueprints: boolean;
  hasPublicAssets: boolean;
  hasTypeScript: boolean;
  publicAssets: Record<string, string>;
};

function updateEmberAddon(packageJson: PackageJson, data: Data): void {
  const { hasPublicAssets, publicAssets } = data;

  if (hasPublicAssets) {
    packageJson['ember-addon'] = {
      'app-js': {},
      main: 'addon-main.cjs',
      'public-assets': publicAssets,
      type: 'addon',
      version: 2,
    };

    return;
  }

  packageJson['ember-addon'] = {
    'app-js': {},
    main: 'addon-main.cjs',
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
  const { hasBlueprints, hasPublicAssets, hasTypeScript } = data;

  const files = new Set(['addon-main.cjs', 'dist']);

  if (hasBlueprints) {
    files.add('blueprints');
  }

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
  const { addon } = context;
  const { packages } = options;

  const hasPublicAssets = Object.keys(addon.publicAssets).length > 0;

  const data = {
    hasBlueprints: addon.hasBlueprints,
    hasPublicAssets,
    hasTypeScript: packages.addon.hasTypeScript,
    publicAssets: addon.publicAssets,
  };

  updateEmberAddon(packageJson, data);
  updateExports(packageJson, data);
  updateFiles(packageJson, data);
  updateTypesVersions(packageJson, data);
}
