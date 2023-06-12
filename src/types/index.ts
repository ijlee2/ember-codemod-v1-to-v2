import type { PackageJson, TsConfigJson } from '@codemod-utils/json';

type CodemodOptions = {
  addonLocation: string | undefined;
  projectRoot: string;
  testAppLocation: string | undefined;
  testAppName: string | undefined;
};

type Context = {
  addon: {
    appReexports: string[];
    publicAssets: string[];
    publicEntrypoints: string[];
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
  packageManager: {
    isNpm: boolean;
    isPnpm: boolean;
    isYarn: boolean;
  };
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

export type { CodemodOptions, Context, Options, PackageJson, TsConfigJson };
