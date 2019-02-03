. $(dirname "$0")/get_repository_id.sh

# Pre-requisite:
#   brew install jq
#
# create_issue <owner> <repo> <title>
#
# Example:
#   create_issue stepweb github "Logo Component"

function create_issue() {
    local output=$(get_repository_id $1 $2 \
        | xargs -I % github-graphql-cli -o $1 -r $2 mutation createIssue \
            --fields.issue.id \
            --inputs.repositoryId "%" \
            --inputs.title "$3")

    echo "$output"
}

# Equivalent to:
#
# mutation {
#     createIssue(
#         input: {
#             repositoryId: "%"
#             title: "$3"
#         }
#     ) {
#         issue {
#             id
#         }
#     }
# }
