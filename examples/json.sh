function json() {
	sed "s/\'/\\\'/g" | \
	sed "s/\\\n//g" | \
	sed "s/\\\r//g" | \
	while read line; do printf "$line"; done| \
	xargs -0 -n1 -I % node -e "console.log(%.$1)"
}
