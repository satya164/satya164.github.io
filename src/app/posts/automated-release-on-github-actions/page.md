---
title: Automated Release on GitHub Actions
description: Releasing an npm package usually has a lot of steps. This is a guide to setting up automated releases for npm packages on GitHub Actions using release-it.
---

# Automated Release on GitHub Actions

[Release It!](https://github.com/release-it/release-it) is a tool to automate releases for npm packages. It can be used to automatically bump the version, generate changelog based, create a git tag, push the changes to the repository, and publish the package to npm.

The version bump and changelog generation is based on the commit messages. It uses [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) by default.

This guide documents how to configure GitHub Actions to automatically release npm packages on every commit using `release-it`.

## Step 1

Install `release-it` and `@release-it/conventional-changelog` as dev dependencies:

```bash
yarn add --dev release-it @release-it/conventional-changelog
```

Configure `release-it` in the `package.json` file:

```js title="package.json"
{
  ...
  "release-it": {
    "git": {
      "commitMessage": "chore: release ${version}",
      "tagName": "v${version}"
    },
    "npm": {
      "publish": true
    },
    "github": {
      "release": true
    },
    "plugins": {
      "@release-it/conventional-changelog": {
        "preset": {
          "name": "conventionalcommits"
        },
        "infile": "CHANGELOG.md"
      }
    }
  },
  ...
}
```

## Step 2

Create a NPM token with publish access. You can create one at `https://www.npmjs.com/settings/[username]/tokens` (replace `[username]` with your username):

- Click on **"Generate New Token"** and select **"Granular Access Token"**
- Provide a token name and expiration date
- Under **"Packages and scopes"**, select **"Read and write"** for permissions
- Then select **"Only select packages and scopes"** and select the package you want to publish
- Click **"Generate token"** and copy the token

Then the token needs to be added as a secret in the GitHub repository:

- Go to the repository and click on **"Settings"**
- Click on **"Secrets and variables"** and choose **"Actions"**
- Click **"New repository secret"** and add the token as `NPM_PUBLISH_TOKEN`
- Click on **"Add secret"** to save the token

This token will be used to authenticate with NPM to publish the package.

## Step 3

Create a GitHub personal access token with the `repo` scope. You can create one [here](https://github.com/settings/tokens/new?scopes=repo&description=release-it).

Then the token needs to be added as a secret in the GitHub repository:

- Go to the repository and click on **"Settings"**
- Click on **"Secrets and variables"** and choose **"Actions"**
- Click **"New repository secret"** and add the token as `PERSONAL_ACCESS_TOKEN`
- Click on **"Add secret"** to save the token

A personal access token is necessary to be able to push the changes back to the repository if the release branch is protected. The user associated with the token needs to have admin access to the repository and be able to bypass branch protection rules.

**Keep in mind that other collaborators on the repo can push actions that use this token and push commits acting as the user associated with the token.**

If there are no branch protection rules in the repository, then the `GITHUB_TOKEN` secret can be used instead of a personal access token.

## Step 4

Create a GitHub Actions workflow file in `.github/workflows/release.yml` with the following contents:

```yml title=".github/workflows/release.yml"
name: Release package
on:
  workflow_run:
    branches:
      - main
    workflows:
      # List of workflows that runs tests, linting, etc.
      # This ensures that the release is only triggered when the tests pass.
      - CI
    types:
      - completed

jobs:
  check-commit:
    runs-on: ubuntu-latest
    # Skip if the workflow run for tests, linting etc. is not successful
    # Without this, the release will be triggered after the previous workflow run even if it failed.
    if: ${{ github.event.workflow_run.conclusion == 'success' }}
    outputs:
      skip: ${{ steps.commit-message.outputs.skip }}
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      # Check if the commit message is a release commit
      # Without this, there will be an infinite loop of releases
      - name: Get commit message
        id: commit-message
        run: |
          MESSAGE=$(git log --format=%B -n 1 $(git log -1 --pretty=format:"%h"))

          if [[ $MESSAGE == "chore: release "* ]]; then
            echo "skip=true" >> $GITHUB_OUTPUT
          fi

  release:
    runs-on: ubuntu-latest
    needs: check-commit
    # Skip if the commit message is a release commit
    if: ${{ needs.check-commit.outputs.skip != 'true' }}
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          # This is needed to generate the changelog from commit messages
          fetch-depth: 0
          token: ${{ secrets.PERSONAL_ACCESS_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v3

      - name: Install dependencies
        run: yarn install --immutable
        shell: bash

      - name: Configure Git
        run: |
          git config user.name "${GITHUB_ACTOR}"
          git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"

      - name: Create release
        run: |
          npm config set //registry.npmjs.org/:_authToken $NPM_TOKEN
          yarn release-it --ci
        env:
          GITHUB_TOKEN: ${{ secrets.PERSONAL_ACCESS_TOKEN }}
          NPM_TOKEN: ${{ secrets.NPM_PUBLISH_TOKEN }}
```

This workflow will automatically publish a new version of the package on every commit to the `main` branch. Make sure to go through the workflow file and modify it according to your needs, especially the `workflows` list in the `on` section.

Alternatively, instead of publishing on every commit, the `workflow_dispatch` event can be used to manually trigger the workflow from the Actions tab in the repository. See the [documentation](https://docs.github.com/en/actions/using-workflows/manually-running-a-workflow) for more details.
