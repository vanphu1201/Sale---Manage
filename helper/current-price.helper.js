module.exports.currentPriceMany = async (products) => {
    products.forEach(product => {
        product.currentPrice = Math.round(product.price * (100 - product.discountPercentage)/100);
    });
    return products;
}