. $(dirname "$0")/json.sh

# count_repo_issues <owner> <repo>
#
# Example:
#   count_repo_issues stepweb github

github-graphql-cli -o $1 -r $2 query repository \
    --inputs.owner $1 --inputs.name $2 \
    --inputs.issues.states "[OPEN, CLOSED]" \
    --fields.issues.totalCount \
| json repository.issues.totalCount
