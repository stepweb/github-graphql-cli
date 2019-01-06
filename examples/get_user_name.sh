. $(dirname "$0")/json.sh

node index.js -o $1 -r $2 query user --inputs.login $3 --fields.name \
| json user.name
