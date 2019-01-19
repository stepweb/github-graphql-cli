. $(dirname "$0")/json.sh

# Pre-requisite:
#   brew install jq
#   npm install -g json2csv
#
# export_project_issues <owner> <repo>
#
# Example:
#   export_project_issues stepweb github

node index.js -o $1 -r $2 query repository \
    --inputs.owner $1 --inputs.name $2 \
    --inputs.issues.states "[OPEN,CLOSED]" \
    --inputs.issues.first 100 \
    --inputs.issues.orderBy "{direction:ASC,field:CREATED_AT}" \
    --fields.issues.nodes.title \
    --fields.issues.nodes.body \
    --fields.issues.nodes.number \
    --fields.issues.nodes.state \
    --fields.issues.pageInfo.hasNextPage \
    --fields.issues.pageInfo.hasPreviousPage \
    --fields.issues.pageInfo.startCursor \
    --fields.issues.pageInfo.endCursor \
| jq .repository.issues.nodes \
| json2csv -f title,body,number,state

# Equivalent to:
#
# query {
#   repository(owner: $1, name: $2) {
#     issues(states:[CLOSED,OPEN], first:100, orderBy:{
#       direction:ASC,
#       field:CREATED_AT
#     }) {
#       nodes {
#         title,
#         body,
#         number,
#         state
#       }
#       pageInfo {
#         hasNextPage
#         hasPreviousPage
#         startCursor
#         endCursor
#       }
#     }
#   }
# }
