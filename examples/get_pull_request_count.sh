. $(dirname "$0")/json.sh

node index.js -o $1 -r $2 query repository \
    --inputs.owner $1 --inputs.name $2 \
    --fields.pullRequests.totalCount \
| json repository.pullRequests.totalCount
