. $(dirname "$0")/json.sh

node index.js -o $1 -r $2 query viewer --fields.name \
| json viewer.name
