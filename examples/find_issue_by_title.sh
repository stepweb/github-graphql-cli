# find_issue_by_title <owner> <repo> <title>
#
# Example:
#   find_issue_by_title stepweb github "Logo Component"

function fetch_issues() {
    local afterCursor="$4"
    local setCursor=""

    if [[ ! -z $afterCursor ]]; then
        setCursor="--inputs.issues.after=$afterCursor"
    fi

    local output=$(github-graphql-cli -o $1 -r $2 query repository \
        --inputs.owner $1 --inputs.name $2 \
        --inputs.issues.first 100 \
        $setCursor \
        --fields.issues.nodes.id \
        --fields.issues.nodes.title \
        --fields.issues.pageInfo.hasNextPage \
        --fields.issues.pageInfo.endCursor)

    echo "$output";
}

afterCursor=$4

while true; do
    issues=$(fetch_issues "$1" "$2" "$3" "$afterCursor")
    pageInfo=$(echo "$issues" | jq .repository.issues.pageInfo)
    hasNextPage=$(echo "$issues" | jq .repository.issues.pageInfo.hasNextPage)
    endCursor=$(echo "$issues" | jq -r .repository.issues.pageInfo.endCursor)
    match=$(echo "$issues" \
        | jq .repository.issues.nodes \
        | jq ".[] | select(.title == \"$3\")")

    if [[ ! -z $match ]]; then
        echo "$match"
        break;
    fi

    if [[ $hasNextPage != "true" ]]; then
        break;
    fi

    afterCursor=$endCursor
done

# Equivalent to:
#
# query {
#   repository(owner: $1, name: $2) {
#     issues(first:100) {
#       pageInfo{
#         hasNextPage,
#         endCursor
#       }
#       nodes{
#         id,
#         title
#       }
#     }
#   }
# }
#
# which then finds the `endCursor to loop through all issues until it
# finds the matching issue using the slightly altered query below:
#
# query {
#   repository(owner: $1, name: $2) {
#     issues(first:100, after: $4) {
#       pageInfo{
#         hasNextPage,
#         endCursor
#       }
#       nodes{
#         id,
#         title
#       }
#     }
#   }
# }
#
