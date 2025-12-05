document.addEventListener("click", function (e) {
    // bỏ qua khi click vào button actions
    if (e.target.closest(".category-actions")) return;

    // xác định phần tử kích hoạt toggle
    const categoryItem = e.target.closest(".category-item");
    const toggleBtn = e.target.closest(".toggle-btn");

    // nếu không click category-item hoặc toggle-btn => bỏ
    if (!categoryItem && !toggleBtn) return;

    // xác định node
    const node = (categoryItem || toggleBtn).closest(".category-node");
    if (!node) return;

    // lấy collapse container cấp trực tiếp
    const sub = node.querySelector(":scope > .category-subcategories");
    if (!sub) return;

    const icon = node.querySelector(":scope > .category-item .toggle-btn i");

    // xử lý collapse
    const collapse = bootstrap.Collapse.getOrCreateInstance(sub);
    collapse.toggle();

    // icon rotate
    if (icon) icon.classList.toggle("rotated");
});
