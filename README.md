# GitHub GraphQL CLI

[![](https://img.shields.io/gitter/room/stepweb/github-graphql-cli.svg)](https://gitter.im/github-graphql-cli/community?utm_source=share-link&utm_medium=link&utm_campaign=share-link)

**Disclaimer:** This project is in no way associated, sponsored, development, maintained, owned, supported, or otherwise affiliated with GitHub.

GitHub GraphQL CLI is a highly versatile CLI tool written entirely in NodeJS that interacts with GitHub's v4 GraphQL API.

The motivation behind this project is to help with CLI automation where one can _easily_ chain it with other CLI tools.

It is designed to be extensible by the open source community, so please contribute enhancements.

- [Install](#install)
- [Configuration](#configuration)
- [Usage](#usage)
- [Supported APIs](#supported-apis)
- [Contributing](#contribute)
- [License](#license)
- [Disclaimer](DISCLAIMER.md)

# Install

```
npm install -g github-graphql-cli
```

# Configuration

A `personalToken` must be setup in GitHub and then set it as an environment variables called `GITHUB_TOKEN`.

**Important**
Without this token this tool will not work.  Do NOT skip this step.

- [GitHub Documentation](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

# Usage

Assuming our repo is `https://github.com/stepweb/github.git` and we want to get information about PR _123_, we would do something like:

```
github-graphql-cli -o stepweb -r github pullRequest 1 \
    --fields.body \
    --fields.author.login \
    --fields.number
```

This would give us the following output:

```
{
    body: 'Initial commit',
    number: 1,
    author: {
        login: 'adamovsky'
    }
}
```

### Example Usage

If we want to get the `pullRequestId` for a `mergePullRequest` command, we could do something like this (assuming our pull request number is _1_):

```
github-graphql-cli -o stepweb -r github pullRequest 1 \
    --fields.id \
    | json id \
    | xargs -I % github-graphql-cli -o stepweb -r github mergePullRequest % \
        --fields.pullRequest.merged
```

Pretty neat.

## Fields

To specify what we want to select from the result set we use _fields_.

Fields follow a dot notation that mirror the hierarchy of the schema.  This means if we go to GitHub's `repository` query (documentation)[https://developer.github.com/v4/object/repository/], at the bottom we see that we can query the field `isPrivate`.

Using dot notation we would simply follow the path of the documentation:

```
--fields.isPrivate
```

Notice we don't have to specify the _query_ (e.g. repository) as part of our _fields_ selection since we already know the context.

It is that simple.

## Inputs

Resolvers can take parameters, which we call _inputs_.  Anytime anything in GraphQL takes a parameter, similar to the _fields_, we use dot notation to mirror the schema.

If we stay on GitHub's `repository` query (documentation)[https://developer.github.com/v4/object/repository/], we can see that `issue` takes a `number` argument.

Using dot notation we would simply follow the path of the documentation:

```
--inputs.issue 123
```

Notice we don't have to specify the _query_ (e.g. repository) as part of our _fields_ selection since we already know the context.

We use _inputs_ to pass arguments to mutations as well.

It is that simple.

# Examples

## Queries
- [Fetch the number of issues in a repository](./examples/count_repo_issues.sh)
- [Export project issues](./examples/export_project_issues.sh)
- [Find an issue by title](./examples/find_issue_by_title.sh)
- [Fetch a GitHub project name](./examples/get_project_name.sh)
- [Fetch number of pull requests](./examples/get_pull_request_count.sh)
- [Fetch the id of a pull request](./examples/get_pull_request_id.sh)
- [Get user's name](./examples/get_user_name.sh)
- [Get viewer name](./examples/get_viewer_name.sh)

## Mutations
- [Create an issue](./examples/create_issue.sh)
- [Create a pull request](./examples/create_pull_request.sh)
- [Merge a pull request](./examples/merge_pull_request.sh)

Open the script you want to run and you will be able to derive what parameters you need to give it.

# Supported APIs

The code has been engineered to where the tool queries GitHub for the latest API. This ensures you don't have to wait for this project to get updated whenever GitHub updates their API.

This means that all the documentation of GitHub's GraphQL API _is_ the documentation for this tool.

## Documentation

- [Mutation](https://developer.github.com/v4/mutation/)
- [Query](https://developer.github.com/v4/query/)

Note that some of the APIs (e.g. `pullRequest`) are shortcut, convenience, or helper APIs, and in themselves are not first level methods of GitHub's official API.

## Bash Alias

To reduce the likelihood of name collision, we use the longer name `github-graphql-cli` for the CLI command.  We highly recommend to make a bash alias if you will use this tool frequently.

In your `.bash_profile` (or `.bashrc`) simply add this line:

```
alias gh="github-graphql-cli"
```

# Contribute

Don't see a feature you need?  Consider joining the project and help enhance it.

Read more in the [CONTRIBUTING](./CONTRIBUTING.md) file for details.

# License

Distributed under [ISC license](./LICENSE.md).
