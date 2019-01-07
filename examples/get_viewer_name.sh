. $(dirname "$0")/json.sh

github-graphql-cli -o $1 -r $2 query viewer --fields.name \
| json viewer.name
