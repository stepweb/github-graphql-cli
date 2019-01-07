. $(dirname "$0")/json.sh

github-graphql-cli -o $1 -r $2 query pullRequest $3 --fields.id \
| json id
