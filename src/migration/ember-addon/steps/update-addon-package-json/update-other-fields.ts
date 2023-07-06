import type { Context, Options, PackageJson } from '../../../../types/index.js';

export function updateOtherFields(
  packageJson: PackageJson,
  context: Context,
  options: Options,
): void {
  const { packages } = options;
  const hasPublicAssets = context.addon.publicAssets.length > 0;

  if (hasPublicAssets) {
    const publicAssetMapping = context.addon.publicAssets.reduce(
      (accumulator, filePath) => {
        const from = `./public/${filePath}`;
        const to = `/${packages.addon.name}/${filePath}`;

        accumulator[from] = to;

        return accumulator;
      },
      {} as Record<string, string>,
    );

    packageJson['ember-addon'] = {
      'app-js': {},
      main: 'addon-main.cjs',
      'public-assets': publicAssetMapping,
      type: 'addon',
      version: 2,
    };
  } else {
    packageJson['ember-addon'] = {
      'app-js': {},
      main: 'addon-main.cjs',
      type: 'addon',
      version: 2,
    };
  }

  if (packages.addon.hasTypeScript) {
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
  } else {
    packageJson['exports'] = {
      '.': './dist/index.js',
      './*': './dist/*.js',
      './addon-main.js': './addon-main.cjs',
    };
  }

  const files = new Set(['addon-main.cjs', 'dist']);

  if (hasPublicAssets) {
    files.add('public');
  }

  if (packages.addon.hasTypeScript) {
    files.add('declarations');
  }

  packageJson['files'] = Array.from(files).sort();

  if (packages.addon.hasTypeScript) {
    packageJson['typesVersions'] = {
      '*': {
        '*': ['declarations/*'],
      },
    };
  }
}
