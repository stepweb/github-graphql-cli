# Contributing to GitHub >

We want to make contributing to this project as easy as possible, with as little red tape as possible.

## Philosophy

Keep the amount of reading and writing to a minimum.  This means the code and user interface must be intuitive and not require documentation in order for it to make sense.

Any interfaces must guide the user into doing the right thing with informative messages.

Achieve more with less.  This project interfaces with a huge API (GitHub GraphQL), but we cannot, and _do not want to_, re-implement that whole API.  As a result, all implementation must leverage the API as much as possible, wherever possible.

Keep the dependency graph as lean as possible.  Do not introduce dependencies for trivial tasks.

Only code for today, not for the future.  Do not anticipate use cases people may (_or may not_) need in the future. Only deal with issues and feature requests submitted via [GitHub issues](https://github.com/stepweb/github/issues).

## Overrides

The API should proxy all API calls to GitHub GraphQL, however helper commands are welcome if they make sense (see `pullRequest`).

We want the tool to be both functional and intuitive.

To introduce these helpers simply create a subfolder in the respective first-level command folder (e.g. `/query`). These will then automagically be absorbed and treated as normal commands.

## Pull Requests

Please make sure the following is done when submitting a pull request:

1. Fork the repo and create your branch from `master`.
2. If you've changed APIs, update the documentation.
3. Make sure your code lints.

We do not currently have unit tests.

## Coding Style

Adhere to the going convention.  Do not introduce your own opinionated code styling.  When in doubt, inquire.

# Issues

We use [GitHub issues](https://github.com/stepweb/github/issues) to track public bugs. Please ensure your description is clear and has sufficient instructions to be able to reproduce the issue.

# License

By contributing to this project, you agree that your contributions will be licensed under the LICENSE file in the root directory of this source tree.
