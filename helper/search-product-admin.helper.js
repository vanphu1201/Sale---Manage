module.exports = (query, find) => {
    const searchValue = query.search;
    if (searchValue) {
        const re = new RegExp(searchValue, "i");
        find = {
            ...find,
            title: re
        }
    }
    return {
        find: find,
        searchValue: searchValue
    };
}