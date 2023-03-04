[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-v1-to-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-v1-to-v2/actions/workflows/ci.yml)

# ember-codemod-v1-to-v2

_Codemod to convert Ember addons to v2 addon format_


## Features

- Scaffolds files according to [`@embroider/addon-blueprint`](https://github.com/embroider-build/addon-blueprint)
- Switches Ember's "magic" import paths to relative paths
- Preserves your code whenever possible
- Supports [`ember-cli-typescript`](https://docs.ember-cli-typescript.com/) and [`glint`](https://typed-ember.gitbook.io/glint/)
- Focuses on maintainability and extensibility


## Usage

You can check [`ember-container-query`](https://github.com/ijlee2/ember-container-query/pull/151) as a reference.

Step 1. Quickly migrate to [v2 format](https://github.com/embroider-build/embroider/blob/main/ADDON-AUTHOR-GUIDE.md).<sup>1</sup>

```sh
cd <your/project/path>
npx ember-codemod-v1-to-v2 <arguments>
```

Step 2. Review the addon package.

- [x] Update the configuration files.<sup>2</sup>
- [x] Colocate stylesheets (if any). Let each component import the relevant stylesheet in the backing class.
- [x] Confirm that you can run all scripts in `package.json`.

Step 3. Review the test-app package.

- [x] Update the configuration files.<sup>2</sup>
- [x] Rename the remaining instances of `dummy` to `test-app`.
- [x] Confirm that you can run all scripts in `package.json`.

Step 4. Review the workspace root including CI/CD.

Step 5. Celebrate.

<sup>1. Before running `ember-codemod-v1-to-v2`, consider [meeting the prerequisites](https://github.com/embroider-build/embroider/blob/v1.8.3/PORTING-ADDONS-TO-V2.md#part-3-prerequisites-for-v2-addon). You can run [`ember-codemod-pod-to-octane`](https://github.com/ijlee2/ember-codemod-pod-to-octane) to un-pod a v1 addon.</sup>

<sup>2. Files such as `.eslintrc.js`, `.gitignore`, `babel.config.json` (addon only), `config/environment.js` (test-app only), `ember-cli-build.js` (test-app only), `package.json`, `rollup.config.mjs` (addon only), `tsconfig.json`, etc.</sup>


### Arguments

In most cases, I recommend running the codemod without any arguments (i.e. allow the default values). This is to help different Ember projects converge to one layout.

<details>
<summary>Optional: Specify the addon location</summary>

By default, the package name decides where the addon package lives. Pass `--addon-location` to override the logic. This may be useful if you have a scoped package.

```sh
npx ember-codemod-v1-to-v2 --addon-location="packages/ui-buttons"
```

</details>

<details>
<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod on a project somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-v1-to-v2 --root=<your/project/path>
```

</details>

<details>
<summary>Optional: Specify the test-app location</summary>

By default, the test-app package lives in the folder `test-app`. Pass `--test-app-location` to override the logic.

```sh
npx ember-codemod-v1-to-v2 --test-app-location="docs"
```

</details>

<details>
<summary>Optional: Specify the test-app name</summary>

By default, the test-app package is named `test-app`. Pass `--test-app-name` to override the logic. This may be useful if you have a workspace with many addons.

```sh
npx ember-codemod-v1-to-v2 --test-app-name="test-app-for-ui-buttons"
```

</details>


### Limitations

The codemod is designed to cover typical uses of an Ember addon. It is not designed to cover one-off cases (e.g. caused by a custom build).

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <your/cloned/repo>
./bin/ember-codemod-v1-to-v2.js --root=<your/project/path>
```

You can also look at another codemod called [`ember-addon-migrator`](https://github.com/NullVoxPopuli/ember-addon-migrator).


## Compatibility

* Node.js v16 or above


## Contributing

If you have an open-sourced addon that I can use as a test fixture, reach out to me on [Discord](https://discord.gg/emberjs) at `ijlee2`. Please star this project so that I can gauge its importance to you and the Ember community. ⭐


## Credits

The codemod steps were based on [Migrating an Ember addon to the next-gen v2 format](https://www.kaliber5.de/de/blog/v2-addon_en) and [Guide: Porting an Addon to v2](https://github.com/embroider-build/embroider/blob/v1.8.3/PORTING-ADDONS-TO-V2.md). The blueprints were derived from [`@embroider/addon-blueprint`](https://github.com/embroider-build/addon-blueprint).


## License

This project is licensed under the [MIT License](LICENSE.md).
