. $(dirname "$0")/json.sh

github-graphql-cli -o $1 -r $2 query pullRequest $3 --fields.id \
| json id \
| xargs -I % github-graphql-cli -o $1 -r $2 mutation mergePullRequest \
    --inputs.pullRequestId % \
    --fields.pullRequest.merged \
| json mergePullRequest.pullRequest.merged
