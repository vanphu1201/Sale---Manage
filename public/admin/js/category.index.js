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


// filter status catecory

function filterCategories(status) {
    const nodes = document.querySelectorAll(".category-node");

    // Reset
    nodes.forEach(node => {
        node.classList.remove("hidden-filter", "faded", "match", "related-parent");
    });

    if (status === "all") return;

    // 1. Mark nodes that match
    nodes.forEach(node => {
        const nodeStatus = node.dataset.status;

        if (nodeStatus === status) {
            node.classList.add("match");
        } else {
            node.classList.add("hidden-filter");
        }
    });

    // 2. Keep parents of matched nodes
    nodes.forEach(node => {
        if (node.classList.contains("match")) {
            let parent = node.parentElement.closest(".category-node");
            while (parent) {
                parent.classList.remove("hidden-filter");
                parent.classList.add("related-parent");
                parent = parent.parentElement.closest(".category-node");
            }
        }
    });

    // 3. Fade everything NOT match & NOT parent
    nodes.forEach(node => {
        if (
            !node.classList.contains("match") &&
            !node.classList.contains("related-parent")
        ) {
            node.classList.add("faded");
        }
    });

    // 4. Auto open visible parents
    nodes.forEach(node => {
        if (!node.classList.contains("hidden-filter")) {
            const sub = node.querySelector(":scope > .category-subcategories");
            const icon = node.querySelector(":scope > .category-item .toggle-btn i");

            if (sub) {
                const collapse = bootstrap.Collapse.getOrCreateInstance(sub, { toggle: false });
                collapse.show();
            }
            if (icon) icon.classList.add("rotated");
        }
    });
}


// End filter status catecory
