function error(message, verbose) {
    console.log(`✗ ${ message }`);
}

function log(message, verbose) {
    if (verbose) {
        console.log(message);
    }
}

module.exports = {
    error,
    log
};
