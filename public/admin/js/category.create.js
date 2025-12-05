// Danh sách icon
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
    { id: 'fa-gift', name: 'Quà tặng', class: 'fas fa-gift' },
    { id: 'fa-music', name: 'Âm nhạc', class: 'fas fa-music' },
    { id: 'fa-camera', name: 'Máy ảnh', class: 'fas fa-camera' },
    { id: 'fa-tv', name: 'Ti vi', class: 'fas fa-tv' },
];

// Khởi tạo khi DOM được tải
document.addEventListener('DOMContentLoaded', function () {
    renderIconSelector();
    setupEventListeners();
    updateSeoPreview();
});

// Render icon selector
function renderIconSelector() {
    const iconSelector = document.getElementById('iconSelector');
    iconSelector.innerHTML = '';

    iconList.forEach(icon => {
        const iconOption = document.createElement('div');
        iconOption.className = 'icon-option';
        iconOption.setAttribute('data-icon-id', icon.id);
        iconOption.innerHTML = `<i class="${icon.class}"></i><span>${icon.name}</span>`;

        iconOption.addEventListener('click', function () {
            document.querySelectorAll('.icon-option').forEach(option => {
                option.classList.remove('selected');
            });
            this.classList.add('selected');
            document.getElementById('categoryIcon').value = icon.id;
        });

        iconSelector.appendChild(iconOption);
    });

    // Select default icon
    document.querySelector('.icon-option').classList.add('selected');
}

// Thiết lập các event listeners
function setupEventListeners() {
    // Tự động tạo slug từ tên danh mục
    document.getElementById('categoryName').addEventListener('input', function () {
        const slug = this.value.toLowerCase()
            .normalize("NFD").replace(/[\\u0300-\\u036f]/g, "")
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');

        document.getElementById('categorySlug').value = slug;
        updateSeoPreview();
    });

    // Cập nhật SEO preview khi các trường thay đổi
    document.getElementById('seoTitle').addEventListener('input', updateSeoPreview);
    document.getElementById('metaDescription').addEventListener('input', function () {
        updateSeoPreview();
        updateMetaCharCount();
    });

    // Image upload
    const imageUploadContainer = document.getElementById('imageUploadContainer');
    const categoryImage = document.getElementById('categoryImage');
    const removeImage = document.getElementById('removeImage');

    imageUploadContainer.addEventListener('click', function () {
        if (!this.classList.contains('has-image')) {
            categoryImage.click();
        }
    });

    categoryImage.addEventListener('change', function () {
        if (this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imageUploadContainer.classList.add('has-image');
                imageUploadContainer.innerHTML = `
                            <img src="${e.target.result}" alt="Category Image" class="upload-preview">
                            <button type="button" class="upload-remove" id="removeImage">
                                <i class="fas fa-times"></i>
                            </button>
                        `;

                // Re-attach event listener to new remove button
                document.getElementById('removeImage').addEventListener('click', function (e) {
                    e.stopPropagation();
                    imageUploadContainer.classList.remove('has-image');
                    imageUploadContainer.innerHTML = `
                                <div class="upload-placeholder">
                                    <i class="fas fa-cloud-upload-alt"></i>
                                    <p>Nhấp để tải lên hình ảnh</p>
                                    <small>JPG, PNG hoặc GIF (Tối đa 2MB)</small>
                                </div>
                                <input type="file" id="categoryImage" accept="image/*" style="display: none;">
                            `;

                    // Re-attach event listener to new file input
                    document.getElementById('categoryImage').addEventListener('change', arguments.callee);
                });
            };
            reader.readAsDataURL(this.files[0]);
        }
    });

    // Remove image button
    removeImage.addEventListener('click', function (e) {
        e.stopPropagation();
        imageUploadContainer.classList.remove('has-image');
        imageUploadContainer.innerHTML = `
                    <div class="upload-placeholder">
                        <i class="fas fa-cloud-upload-alt"></i>
                        <p>Nhấp để tải lên hình ảnh</p>
                        <small>JPG, PNG hoặc GIF (Tối đa 2MB)</small>
                    </div>
                    <input type="file" id="categoryImage" accept="image/*" style="display: none;">
                `;

        // Re-attach event listener to new file input
        document.getElementById('categoryImage').addEventListener('change', arguments.callee);
    });

    // Sidebar toggle for mobile
    document.querySelector('.sidebar-toggle').addEventListener('click', function () {
        document.querySelector('.sidebar').classList.toggle('active');
    });
}

// Cập nhật SEO preview
function updateSeoPreview() {
    const categoryName = document.getElementById('categoryName').value || 'Tên danh mục';
    const seoTitle = document.getElementById('seoTitle').value || categoryName;
    const categorySlug = document.getElementById('categorySlug').value || 'danh-muc';
    const metaDescription = document.getElementById('metaDescription').value || 'Mô tả danh mục...';

    document.getElementById('seoPreviewTitle').textContent = seoTitle;
    document.getElementById('seoPreviewDescription').textContent = metaDescription.length > 160
        ? metaDescription.substring(0, 160) + '...'
        : metaDescription;
}

// Cập nhật số ký tự meta description
function updateMetaCharCount() {
    const metaDescription = document.getElementById('metaDescription').value;
    document.getElementById('metaCharCount').textContent = metaDescription.length;
}

// Xem trước danh mục
function previewCategory() {
    const categoryName = document.getElementById('categoryName').value || 'Tên danh mục';
    const parentCategory = document.getElementById('parentCategory').value;
    const categorySlug = document.getElementById('categorySlug').value || 'danh-muc';
    const categoryDescription = document.getElementById('categoryDescription').value || 'Mô tả danh mục';
    const isActive = document.getElementById('isActive').checked;
    const selectedIcon = document.getElementById('categoryIcon').value || 'fa-tshirt';

    // Find icon object
    const iconObj = iconList.find(icon => icon.id === selectedIcon);
    const iconClass = iconObj ? iconObj.class : 'fas fa-tag';

    // Find parent category name
    let parentName = 'Không có';
    if (parentCategory) {
        const parentSelect = document.getElementById('parentCategory');
        const selectedOption = parentSelect.options[parentSelect.selectedIndex];
        parentName = selectedOption.text.replace(/^--\\s*/, '');
    }

    // Update preview modal
    document.getElementById('previewIcon').className = iconClass;
    document.getElementById('previewName').textContent = categoryName;
    document.getElementById('previewDetailName').textContent = categoryName;
    document.getElementById('previewDetailParent').textContent = parentName;
    document.getElementById('previewDetailSlug').textContent = categorySlug;
    document.getElementById('previewDetailDescription').textContent = categoryDescription;
    document.getElementById('previewDetailStatus').textContent = isActive ? 'Hoạt động' : 'Không hoạt động';

    // Show modal
    const previewModal = new bootstrap.Modal(document.getElementById('previewModal'));
    previewModal.show();
}

// Lưu danh mục
function saveCategory() {
    const form = document.getElementById('categoryForm');

    // Validate form
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    // Get form data
    const formData = {
        name: document.getElementById('categoryName').value,
        parent: document.getElementById('parentCategory').value,
        sort: document.getElementById('categorySort').value,
        icon: document.getElementById('categoryIcon').value,
        description: document.getElementById('categoryDescription').value,
        slug: document.getElementById('categorySlug').value,
        seoTitle: document.getElementById('seoTitle').value,
        metaDescription: document.getElementById('metaDescription').value,
        metaKeywords: document.getElementById('metaKeywords').value,
        isActive: document.getElementById('isActive').checked,
        showOnHomepage: document.getElementById('showOnHomepage').checked,
        showInMenu: document.getElementById('showInMenu').checked,
        showInSidebar: document.getElementById('showInSidebar').checked
    };

    // Log form data (in real app, this would be sent to server)
    console.log('Saving category:', formData);

    // Show success notification
    showToast('Danh mục đã được lưu thành công!', 'success');

    // Redirect to categories page after a delay
    setTimeout(() => {
        window.location.href = 'categories.html';
    }, 2000);
}

// Hiển thị thông báo
function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';

    toast.innerHTML = `
                <div class="toast-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="toast-message">${message}</div>
                <button class="toast-close">
                    <i class="fas fa-times"></i>
                </button>
            `;

    toastContainer.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);

    // Auto hide after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 5000);

    // Close button
    toast.querySelector('.toast-close').addEventListener('click', function () {
        toast.classList.remove('show');
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    });
}