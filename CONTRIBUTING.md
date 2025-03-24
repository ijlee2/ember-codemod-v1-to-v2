# Contributing to ember-codemod-v1-to-v2

Open source projects like `ember-codemod-v1-to-v2` live on your words of encouragement and contribution. Please give feedback, report issues, or submit pull requests!

Here are some guidelines to help you and everyone else.


## Local development

<details>

<summary>Install dependencies</summary>

1. Fork and clone this repo.

    ```sh
    git clone git@github.com:<your-github-handle>/ember-codemod-v1-to-v2.git
    ```

1. Change directory.

    ```sh
    cd ember-codemod-v1-to-v2
    ```

1. Use [`pnpm`](https://pnpm.io/installation) to install dependencies.

    ```sh
    pnpm install
    ```

</details>


<details>

<summary>Lint files</summary>

1. When you write code, please check that it meets the linting rules.

    ```sh
    pnpm lint
    ```

1. You can run `lint:fix` to automatically fix linting errors.

    ```sh
    pnpm lint:fix
    ```

</details>


<details>

<summary>Run tests</summary>

1. When you write code, please check that all tests continue to pass.

    ```sh
    pnpm test
    ```

</details>


<details>

<summary>Add changeset to pull request</code></summary>

1. To record how a pull request affects packages, you will want to add a changeset.

    The changeset provides a summary of the code change. It also describes how package versions should be updated (major, minor, or patch) as a result of the code change.

    ```sh
    pnpm changeset
    ```

</details>


<details>

<summary>Publish package (for admins)</summary>

1. Generate a [personal access token](https://github.com/settings/tokens/) in GitHub, with default values for scopes (none selected).

1. Run the `release:prepare` script. This removes changesets, updates the package version (e.g. from `0.1.1` to `0.1.2`), and updates the `CHANGELOG`.

    ```sh
    GITHUB_TOKEN=<YOUR_PERSONAL_ACCESS_TOKEN> pnpm release:prepare
    ```

1. Review the file changes. Commit them in a branch, then open a pull request to merge the changes to the `main` branch.

    ```sh
    git checkout -b tag-0.1.2
    git add .
    git commit -m "Tagged 0.1.2"
    git push origin tag-0.1.2
    ```

1. [Create a tag](https://github.com/ijlee2/ember-codemod-v1-to-v2/releases/new) and provide release notes. The tag name should match the package version (e.g. `0.1.2`).

1. Publish the package.

    ```sh
    pnpm release:publish
    ```

</details>
