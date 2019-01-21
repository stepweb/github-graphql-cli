. $(dirname "$0")/json.sh

# get_project_name <owner> <repo> <projectId>
#
# Example:
#   get_project_name stepweb github 1

github-graphql-cli -o $1 -r $2 query repository \
    --inputs.owner $1 --inputs.name $2 \
    --inputs.project.number $3 \
    --fields.project.name \
| json repository.project.name
