# Contributing to ember-codemod-v1-to-v2

Open source projects like `ember-codemod-v1-to-v2` live on your words of encouragement and contribution. Please give feedback, report issues, or submit pull requests!

Here are some guidelines to help you and everyone else.


## Local development

<details>

<summary>Install dependencies</summary>

1. Fork and clone this repo.

    ```sh
    git clone git@github.com:<your GitHub handle>/ember-codemod-v1-to-v2.git
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

<summary>Publish packages (for admins)</summary>

1. Generate a [personal access token](https://github.com/settings/tokens/) in GitHub, with default values for scopes (none selected).

1. Run the `changelog` script. This generates a text that you can add to `CHANGELOG.md`.

    ```sh
    GITHUB_AUTH=<YOUR_PERSONAL_ACCESS_TOKEN> pnpm changelog
    ```

1. The package follows [semantic versioning](https://semver.org/). Update the version in `package.json` accordingly.

1. [Create a tag](https://github.com/ijlee2/ember-codemod-v1-to-v2/releases/new) and provide release notes. The tag name should match the package version.

1. Publish the package.

    ```sh
    pnpm publish
    ```

</details>


## How can I help?

If you haven't before, I encourage you to watch [Sean Massa's mini-talk](https://www.youtube.com/watch?v=CcSKlsc_AhQ) on what it means to be a contributor. To sum up the talk, you can be a contributor in many ways. I want you to discover a path that meets your goals well!

Here are some suggestions to help you start:


<details>

<summary>Give feedback 💞</summary>

1. An open source project's value comes from people using the code and extending it to make greater things. Let me know how the codemod worked on your Ember addon!

1. You can **create an issue** to:

    - Share how you used `ember-codemod-v1-to-v2`
    - Share what you liked or didn't like about `ember-codemod-v1-to-v2`

</details>


<details>

<summary>Help with marketing 📢</summary>

1. Platforms include:

    - Blog post
    - GitHub star
    - Meetup or conference talk
    - Social media
    - Word of mouth

</details>


<details>

<summary>Join this project 👩‍💻👨‍💻</summary>

1. Help me maintain the project! I have limited time and there is much that I don't know.

    - Cut releases
    - Research new ways to implement v2 addons
    - Respond to issues
    - Review pull requests

</details>


<details>

<summary>Make issues 📝</summary>

1. In addition to sharing feedback (described in `Give feedback`), you can create an issue to:

    - Ask for better documentation
    - Ask for new feature or refactor
    - Report bug
    - Report outdated dependency

1. When reporting a bug, please provide details to help me understand what's going on. If possible, please use the latest version of `ember-codemod-v1-to-v2` and set up a public demo that I (and others) can check the code.

</details>


💡 Have ideas for contribution? Reach out to `@ijlee2` on [Discord](https://discord.com/invite/emberjs)!
