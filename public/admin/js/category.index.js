// Danh sách icon dùng trong Modal
const iconList = [
    { id: 'fa-tshirt', name: 'Thời trang', class: 'fas fa-tshirt' },
    { id: 'fa-laptop', name: 'Laptop', class: 'fas fa-laptop' },
    { id: 'fa-home', name: 'Nhà cửa', class: 'fas fa-home' },
    { id: 'fa-basketball-ball', name: 'Thể thao', class: 'fas fa-basketball-ball' },
    { id: 'fa-book', name: 'Sách', class: 'fas fa-book' },
    { id: 'fa-gamepad', name: 'Game', class: 'fas fa-gamepad' },
    { id: 'fa-car', name: 'Ô tô', class: 'fas fa-car' },
    { id: 'fa-baby', name: 'Em bé', class: 'fas fa-baby' },
    { id: 'fa-heart', name: 'Sức khỏe', class: 'fas fa-heart' },
    { id: 'fa-utensils', name: 'Đồ ăn', class: 'fas fa-utensils' },
    { id: 'fa-mobile-alt', name: 'Điện thoại', class: 'fas fa-mobile-alt' },
    { id: 'fa-wrench', name: 'Dụng cụ', class: 'fas fa-wrench' },
    { id: 'fa-paw', name: 'Thú cưng', class: 'fas fa-paw' },
    { id: 'fa-plane', name: 'Du lịch', class: 'fas fa-plane' },
];

// Giả lập dữ liệu danh mục để hiển thị chi tiết
const dummyCategoryData = {
    1: { name: 'Thời trang', parent: 'Không có', status: 'Hoạt động', products: 156, subcategories: 8, slug: 'thoi-trang' },
    2: { name: 'Thời trang nam', parent: 'Thời trang', status: 'Hoạt động', products: 89, subcategories: 4, slug: 'thoi-trang-nam' },
    3: { name: 'Áo sơ mi', parent: 'Thời trang nam', status: 'Hoạt động', products: 45, subcategories: 0, slug: 'ao-so-mi' },
    4: { name: 'Áo thun', parent: 'Thời trang nam', status: 'Ngừng hoạt động', products: 67, subcategories: 0, slug: 'ao-thun' },
    5: { name: 'Điện tử', parent: 'Không có', status: 'Hoạt động', products: 89, subcategories: 4, slug: 'dien-tu' },
    17: { name: 'Sách & Văn phòng phẩm', parent: 'Không có', status: 'Ngừng hoạt động', products: 0, subcategories: 0, slug: 'sach-van-phong' },
};




// ----------------------------------------------------
// Các hàm chức năng khác
// ----------------------------------------------------

function toggleSubcategories(element) {
    const collapseElement = element.parentElement.querySelector('.category-subcategories');
    const toggleBtn = element.querySelector('.toggle-btn');

    if (collapseElement) {
        const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });
        bsCollapse.toggle();
        toggleBtn.classList.toggle('collapsed');
    }
}

function filterCategories(status) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${status}"]`).classList.add('active');

    const allCategoryNodes = document.querySelectorAll('.category-node[data-status]');

    allCategoryNodes.forEach(node => {
        const nodeStatus = node.getAttribute('data-status');

        if (status === 'all' || nodeStatus === status) {
            node.style.display = '';
        } else {
            node.style.display = 'none';
        }
    });
}

document.getElementById('searchInput').addEventListener('input', function () {
    const searchTerm = this.value.toLowerCase();
    const categoryNodes = document.querySelectorAll('.category-node');

    categoryNodes.forEach(node => {
        const categoryItem = node.querySelector('.category-item');
        if (!categoryItem) return;

        const categoryName = categoryItem.querySelector('.category-name').textContent.toLowerCase();

        if (categoryName.includes(searchTerm)) {
            node.style.display = '';
        } else {
            node.style.display = 'none';
        }
    });
});


