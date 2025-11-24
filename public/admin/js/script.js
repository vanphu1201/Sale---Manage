// click change status product
const btnsChangeStatus = document.querySelectorAll("[current-status]");
if (btnsChangeStatus.length) {
    btnsChangeStatus.forEach(btn => {
        btn.addEventListener("click", () => {
            const url = new URL(window.location.href);
            const currentStatus = btn.getAttribute("current-status");
            const productId = btn.closest("[box-product]").getAttribute("product-id");
            if (currentStatus && productId) {
                url.searchParams.set("currentStatus", currentStatus);
                url.searchParams.set("productId", productId);
                window.location.href = url.href;
            }
        })
    })
}
// End click change status product
