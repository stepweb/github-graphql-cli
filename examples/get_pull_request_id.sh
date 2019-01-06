. $(dirname "$0")/json.sh

node index.js -o $1 -r $2 query pullRequest $3 --fields.id \
| json id
