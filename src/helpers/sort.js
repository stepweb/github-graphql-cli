const sortByKey = objectToBeSorted => {
    return Object.keys(objectToBeSorted).sort().reduce((accumulator, key) => {
        accumulator[key] = objectToBeSorted[key];

        return accumulator;
    }, {});
};

module.exports = {
    sortByKey
};
