import type { PackageJson } from '@codemod-utils/package-json';

type CodemodOptions = {
  addonLocation: string | undefined;
  projectRoot: string;
  testAppLocation: string | undefined;
  testAppName: string | undefined;
};

type Context = {
  addon: {
    hasBlueprints: boolean;
    hasPublicAssets: boolean;
    publicAssets: Record<string, string>;
  };
  projectRoot: {
    devDependencies: Record<string, string>;
  };
};

type Options = {
  locations: {
    addon: string;
    testApp: string;
  };
  packageManager: 'npm' | 'pnpm' | 'yarn';
  packages: {
    addon: {
      dependencies: Map<string, string>;
      hasGlint: boolean;
      hasTypeScript: boolean;
      isV1Addon: boolean;
      name: string;
      version: string;
    };
    testApp: {
      name: string;
    };
  };
  projectRoot: string;
};

export type { CodemodOptions, Context, Options, PackageJson };
