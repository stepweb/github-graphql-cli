# get_user_name_dry <owner> <repo> <login>
#
# Example:
#   get_user_name_dry stepweb github stepweb

github-graphql-cli -d -o $1 -r $2 query user \
    --inputs.login $3 \
    --fields.name
