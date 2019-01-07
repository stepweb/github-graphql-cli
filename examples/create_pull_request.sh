. $(dirname "$0")/json.sh

# create_pull_request <owner> <repo> <base branch> <branch> <title> <body>
#
# Example:
#   create_pull_request stepweb github master 123 "Title" "Body"

github-graphql-cli -o $1 -r $2 query repository \
    --inputs.owner $1 --inputs.name $2 \
    --fields.id \
| json repository.id \
| xargs -I % github-graphql-cli -o $1 -r $2 mutation createPullRequest \
    --inputs.baseRefName $3 \
    --inputs.headRefName $4 \
    --inputs.title $5 \
    --inputs.body $6 \
    --inputs.repositoryId % \
    --fields.pullRequest.state \
| json createPullRequest.pullRequest.state
