module.exports = (query, find) => {
    const status = query.status;
    if (status) {
        find = {
            ...find,
            status: status
        }
    }
    return find;
}