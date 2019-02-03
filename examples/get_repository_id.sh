# Pre-requisite:
#   brew install jq
#
# get_repository_id <owner> <repo>
#
# Example:
#   get_repository_id stepweb github

function get_repository_id() {
    local output=$(github-graphql-cli -o "$1" -r "$2" query repository \
        --inputs.owner "$1" \
        --inputs.name "$2" \
        --fields.id \
    | jq -r .repository.id)

    echo "$output"
}
