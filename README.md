# GitHub GraphQL CLI

GitHub GraphQL CLI is a highly versatile CLI tool written entirely in NodeJS that interacts with GitHub's v4 GraphQL API.

The motivation behind this project is to help with CLI automation where one can _easily_ chain it with other CLI tools.

It is designed to be extensible by the open source community, so please contribute enhancements.

- [Install](#install)
- [Configuration](#configuration)
- [Usage](#usage)
- [Supported APIs](#supported-apis)
- [Contributing](#contribute)
- [License](#license)

# Install

```
npm install -g github-graphql-cli
```

# Configuration

A `personalToken` must be setup in GitHub and then copied into `config/dev.js`.

The configurations are javascript files so if you prefer to configure dot env files, it is trivial to wire a `.env` file to hydrate this config file.

- [GitHub Documentation](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/)

## Bash Alias

To reduce the likelihood of name collision, we use the longer name `github-graphql-cli` for the CLI command.  We highly recommend to make a bash alias if you will use this tool frequently.

In your `.bash_profile` (or `.bashrc`) simply add this line:

```
alias gh="github-graphql-cli"
```

# Usage

Assuming our repo is `https://github.com/stepweb/github.git` and we want to get information about PR _123_, we would do something like:

```
github-graphql-cli -o stepweb -r github pullRequest 1 \
    --fields.body --fields.author.login --fields.number
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

For automation one could use something like `jq` to parse the JSON, or if one follows a _minimal dependency_ approach, one can parse the JSON without `jq` as such in bash:

```
github-graphql-cli -o stepweb -r github pullRequest 1 \
    --fields.body \
    | sed "s/\'/\\\'/g" \
    | sed "s/\\\n//g" \
    | sed "s/\\\r//g" \
    | while read line; do printf "$line"; done \
    | xargs -0 -n1 -I % node -e 'console.log(%.body)'
```

## JSON Bash Function

The above can be written to a bash function `json`.  Simply add the code below into your `.bash_profile` or `.bashrc` file.

```
function json() {
	sed "s/\'/\\\'/g" | \
	sed "s/\\\n//g" | \
	sed "s/\\\r//g" | \
	while read line; do printf "$line"; done| \
	xargs -0 -n1 -I % node -e "console.log(%.$1)"
}
```

This file can also be found in [examples/json.sh](examples/json.sh).

It can then easily be chained with other commands.

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

### Other Examples

There are bash scripts in the [examples](./examples) folder.

Open the script you want to run and you will be able to derive what parameters you need to give it.

An example use would be:

```
bash examples/get_viewer_name.sh <userid> <repo>
```

# Supported APIs

The code has been engineered to where the tool queries GitHub for the latest API. This ensures you don't have to wait for this project to get updated whenever GitHub updates their API.

This means that all the documentation of GitHub's GraphQL API _is_ the documentation for this tool.

## Documentation

- [Mutation](https://developer.github.com/v4/mutation/)
- [Query](https://developer.github.com/v4/query/)

Note that some of the APIs (e.g. `pullRequest`) are shortcut, convenience, or helper APIs, and in themselves are not first level methods of GitHub's official API.

# Contribute

Don't see a feature you need?  Consider joining the project and help enhance it.

Read more in the [CONTRIBUTING](./CONTRIBUTING.md) file for details.

# License

Distributed under [ISC license](./LICENSE.md).
