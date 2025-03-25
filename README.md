[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-v1-to-v2/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-v1-to-v2/actions/workflows/ci.yml)

# ember-codemod-v1-to-v2

_Codemod to convert Ember addons to v2 addon format_


## Features

- Follows closely [`@embroider/addon-blueprint`](https://github.com/embroider-build/addon-blueprint)
- Preserves your code whenever possible
- Supports [`ember-cli-typescript`](https://docs.ember-cli-typescript.com/) and [`glint`](https://typed-ember.gitbook.io/glint/)
- Focuses on maintainability and extensibility


## Usage

For examples, see [`ember-container-query`](https://github.com/ijlee2/ember-container-query/pull/151/commits) and [`ember-render-helpers`](https://github.com/buschtoens/ember-render-helpers/pull/447/commits).

Step 1. Quickly migrate to [v2 format](https://github.com/embroider-build/embroider/blob/v7.1.3-%40embroider/addon-dev/docs/addon-author-guide.md).

```sh
cd <path/to/your/project>
npx ember-codemod-v1-to-v2 <arguments>
```

> [!IMPORTANT]
>
> Before you run `ember-codemod-v1-to-v2`, I recommend that you address existing tech debts (one at a time). That is, treat the v2 migration as its own thing.
>
> Here are examples of what you may want to work on first:
>
> - [Meet prerequisites for v2 addon](https://github.com/embroider-build/embroider/blob/v7.1.3-%40embroider/addon-dev/docs/porting-addons-to-v2.md#part-3-prerequisites-for-v2-addon).
> - [Un-pod v1 addon](https://github.com/ijlee2/ember-codemod-pod-to-octane).
> - Update dependencies.
> - Switch `npm` or `yarn` to `pnpm`.

Step 2. Review the addon package.

- [x] Update configuration files.<sup>1</sup>
- [x] Install missing dependencies.
- [x] Relative import paths must specify the file extension `.js` or `.ts`.
- [x] Colocate stylesheets (if any). Let each component import the relevant stylesheet in the backing class.
- [x] Confirm that you can run all scripts in `package.json`.

Step 3. Review the test-app package.

- [x] Update configuration files.<sup>1</sup>
- [x] Rename the remaining instances of `dummy` to `test-app`.
- [x] Confirm that you can run all scripts in `package.json`.

Step 4. Review the workspace root including CI/CD.

<sup>1. Files such as `eslint.config.mjs`, `.gitignore`, `babel.config.json` (addon only), `config/environment.js` (test-app only), `ember-cli-build.js` (test-app only), `package.json`, `rollup.config.mjs` (addon only), `tsconfig.json`, etc.</sup>


### Arguments

In most cases, I recommend running the codemod without any arguments (i.e. allow the default values). This is to help different Ember projects converge to one layout.

<details>

<summary>Optional: Specify the addon location</summary>

By default, the package name decides where the addon package lives. Pass `--addon-location` to override the logic. This may be useful if you have a workspace with many addons.

```sh
npx ember-codemod-v1-to-v2 --addon-location packages/ui/button
```

</details>


<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod on a project somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-v1-to-v2 --root <path/to/your/project>
```

</details>


<details>

<summary>Optional: Specify the test-app location</summary>

By default, the test-app package lives in the folder `test-app`. Pass `--test-app-location` to override the logic.

```sh
npx ember-codemod-v1-to-v2 --test-app-location docs-app
```

</details>


<details>

<summary>Optional: Specify the test-app name</summary>

By default, the test-app package is named `test-app`. Pass `--test-app-name` to override the logic. This may be useful if you have a workspace with many addons.

```sh
npx ember-codemod-v1-to-v2 --test-app-name test-app-for-ui-button
```

</details>


### Limitations

The codemod is designed to cover typical uses of an Ember addon. It is not designed to cover one-off cases (e.g. caused by a custom build).

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-v1-to-v2.js --root <path/to/your/project>
```

You can also look at another codemod called [`ember-addon-migrator`](https://github.com/NullVoxPopuli/ember-addon-migrator).


## Compatibility

- Node.js v18 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

If you have an open-sourced addon (v1 or v2) that I can use as a reference, reach out to me on [Discord](https://discord.gg/emberjs) at `ijlee2`. Please star this project so that I can gauge its importance to you and the Ember community. ⭐


## Credits

The codemod steps were based on [Migrating an Ember addon to the next-gen v2 format](https://www.kaliber5.de/de/blog/v2-addon_en) and [Guide: Porting an Addon to v2](https://github.com/embroider-build/embroider/blob/v7.1.3-%40embroider/addon-dev/docs/porting-addons-to-v2.md). The blueprints were derived from [`@embroider/addon-blueprint`](https://github.com/embroider-build/addon-blueprint).


## License

This project is licensed under the [MIT License](LICENSE.md).
