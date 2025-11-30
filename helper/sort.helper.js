module.exports = (query, sort) => {
    const dataSort = query.sort;
        if (dataSort) {
            const [criterion, value] = dataSort.split("-");
            sort = {
                [criterion]: value
            }
        }
    return sort;
}