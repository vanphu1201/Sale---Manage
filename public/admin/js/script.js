// Sidebar toggle for mobile
document.querySelector('.sidebar-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});
// End Sidebar toggle for mobile

// Check box change multi
const checkBoxAll = document.querySelector("input[name='check-all']");
const checkBoxs = document.querySelectorAll("input[name='check']");

if (checkBoxAll && checkBoxs.length) {
    checkBoxAll.addEventListener("change", e => {
        const checkBoxs = document.querySelectorAll("input[name='check']");
        if (checkBoxAll.checked) {
            checkBoxs.forEach(input => {
                input.checked = true;
            })
        } else {
            checkBoxs.forEach(input => {
                input.checked = false;
            })
        }
    });

    checkBoxs.forEach( checkBox => {
        checkBox.addEventListener("change", e => {
            checkBox.checked =(checkBox.checked == true ? false : true);
            const checBoxsChecked = document.querySelectorAll("input[name='check']:checked");
            if (checkBoxs.length != checBoxsChecked.length) {
                checkBoxAll.checked = false;
            } else {
                checkBoxAll.checked = true;
            }
        });
    });
}

// End Check box change multi


// filter status
const filterGroup = document.querySelector(".filter-group");
if (filterGroup) {
    const filterStatus = document.querySelectorAll("a[status]");
    let url = new URL(window.location.href);
    filterStatus.forEach(btn => {
        btn.addEventListener("click", e => {
            const status = btn.getAttribute("status");
            if (status) {
                url.searchParams.set("status", status);
                window.location.href = url.href;
            } else {
                url.searchParams.delete("status");
                window.location.href = url.href;
            }
            
        })
    })
}
// End filter status

const sidebarToggle = document.querySelector('.sidebar-toggle');
if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        document.querySelector('.sidebar')?.classList.toggle('active');
    });
}


// Filter products
function filterProducts(status) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-filter="${status}"]`).classList.add('active');

    // Filter table rows
    const rows = document.querySelectorAll('#productTableBody tr');
    let visibleCount = 0;

    rows.forEach(row => {
        if (status === 'all' || row.dataset.status === status) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    // Show/hide no results message
    const noResults = document.getElementById('noResults');
    const table = document.querySelector('.table-custom');

    if (visibleCount === 0) {
        noResults.style.display = 'block';
        table.style.display = 'none';
    } else {
        noResults.style.display = 'none';
        table.style.display = 'table';
    }

    // Update pagination info
    updatePaginationInfo(visibleCount);
}

// Update pagination info
function updatePaginationInfo(visibleCount) {
    const showingCount = document.getElementById('showingCount');
    const totalCount = document.getElementById('totalCount');

    if (visibleCount > 0) {
        showingCount.textContent = `1-${visibleCount}`;
    } else {
        showingCount.textContent = '0';
    }

}

// Toggle sort menu
function toggleSortMenu() {
    document.getElementById('sortMenu').classList.toggle('show');
}

// Sort products
function sortProducts(sortType) {
    // Update active sort option
    document.querySelectorAll('.sort-option').forEach(option => {
        option.classList.remove('active');
    });
    document.querySelector(`[data-sort="${sortType}"]`).classList.add('active');

    // Close sort menu
    document.getElementById('sortMenu').classList.remove('show');

    // Get table body and rows
    const tableBody = document.getElementById('productTableBody');
    const rows = Array.from(tableBody.querySelectorAll('tr'));

    // Sort rows based on sort type
    rows.sort((a, b) => {
        switch (sortType) {
            case 'name':
                return a.dataset.name.localeCompare(b.dataset.name);
            case 'price-asc':
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            case 'price-desc':
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            case 'stock':
                return parseInt(b.dataset.stock) - parseInt(a.dataset.stock);
            case 'date':
                return new Date(b.dataset.date) - new Date(a.dataset.date);
            default:
                return 0;
        }
    });

    // Re-append sorted rows to table
    rows.forEach(row => {
        tableBody.appendChild(row);
    });
}

// Update bulk actions
function updateBulkActions() {
    const checkboxes = document.querySelectorAll('.product-checkbox');
    const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');

    // Update selected count
    selectedCount.textContent = checkedBoxes.length;

    // Show/hide bulk actions
    if (checkedBoxes.length > 0) {
        bulkActions.classList.add('show');
    } else {
        bulkActions.classList.remove('show');
    }

    // Update header checkbox state
    const headerCheckbox = document.getElementById('headerCheckbox');
    if (checkedBoxes.length === 0) {
        headerCheckbox.checked = false;
        headerCheckbox.indeterminate = false;
    } else if (checkedBoxes.length === checkboxes.length) {
        headerCheckbox.checked = true;
        headerCheckbox.indeterminate = false;
    } else {
        headerCheckbox.checked = false;
        headerCheckbox.indeterminate = true;
    }
}

// Toggle select all
function toggleSelectAll() {
    const headerCheckbox = document.getElementById('headerCheckbox');
    const checkboxes = document.querySelectorAll('.product-checkbox');

    checkboxes.forEach(checkbox => {
        checkbox.checked = headerCheckbox.checked;
    });

    updateBulkActions();
}


const formChangeMulti = document.querySelector("[form-change-status]");
if (formChangeMulti) {
    const action = formChangeMulti.getAttribute("action");


    // Bulk activate
    const btnActiveMulti = formChangeMulti.querySelector("[active-multi]");
    btnActiveMulti.addEventListener("click", (e) => {
        e.preventDefault();
        const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
        console.log(checkedBoxes)
        let ids = ``;
        checkedBoxes.forEach((checkedBox) => {
            const id = checkedBox.closest("tr[box-product]").getAttribute("product-id");
            ids = `${ids}-${id}`;
        });
        formChangeMulti.action = `${action}/active/${ids}`;
        formChangeMulti.submit();
    });




    // Bulk deactivate
    const btnInactiveMulti = formChangeMulti.querySelector("[inactive-multi]");
    btnInactiveMulti.addEventListener("click", (e) => {
        e.preventDefault();
        const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
        let ids = ``;
        checkedBoxes.forEach((checkedBox) => {
            const id = checkedBox.closest("tr[box-product]").getAttribute("product-id");
            ids = `${ids}-${id}`;
        });
        formChangeMulti.action = `${action}/inactive/${ids}`;
        formChangeMulti.submit();
    });




    // Bulk delete
    const btnDeleteMulti = formChangeMulti.querySelector("[delete-all]");
    btnDeleteMulti.addEventListener("click", (e) => {
        e.preventDefault();
        const checkedBoxes = document.querySelectorAll('.product-checkbox:checked');
        let ids = ``;
        checkedBoxes.forEach((checkedBox) => {
            const id = checkedBox.closest("tr[box-product]").getAttribute("product-id");
            ids = `${ids}-${id}`;
        });
        formChangeMulti.action = `${action}/delete/${ids}`;
        formChangeMulti.submit();
    })
}


// sort
const btnsSort = document.querySelectorAll("[data-sort]");
if (btnsSort.length) {
    btnsSort.forEach(btn => {
        let url = new URL(window.location.href);
        btn.addEventListener("click", (e) => {
            const dataSort = btn.getAttribute("data-sort");
            url.searchParams.set("sort", dataSort);
            window.location.href = url.href;
        })
    })
}
// end sort


      
// Close sort menu when clicking outside
document.addEventListener('click', function (event) {
    const sortDropdown = document.querySelector('.sort-dropdown');
    const sortMenu = document.getElementById('sortMenu');

    if (sortDropdown && sortMenu) {
        if (!sortDropdown.contains(event.target)) {
            sortMenu.classList.remove('show');
        }
    }
});


// Pagination
const paginationContainer = document.querySelector(".pagination-container");
if (paginationContainer) {
    const btnsPage = paginationContainer.querySelectorAll(".page-btn");
    if (btnsPage.length) {
        let url = new URL(window.location.href);
        btnsPage.forEach(btn => {
            btn.addEventListener("click", e => {
                const page = btn.getAttribute("page");
                url.searchParams.set("page", page);
                window.location.href = url.href;
            })
        })
    }
    const btnsPageLeft = paginationContainer.querySelector(".page-btn-left");
    const btnPageRight = paginationContainer.querySelector(".page-btn-right");
    if (btnsPageLeft) {
        btnsPageLeft.addEventListener("click", e => {
            let url = new URL(window.location.href);
            let currentPage = url.searchParams.get("page");
            if (currentPage) {
                url.searchParams.set("page", parseInt(currentPage) - 1);
                window.location.href = url.href;
                
            }
        })
    }

    if (btnPageRight) {
        btnPageRight.addEventListener("click", e => {
            let url = new URL(window.location.href);
            let currentPage = url.searchParams.get("page");
            if (currentPage) {
                url.searchParams.set("page", parseInt(currentPage) + 1);
                window.location.href = url.href;
            } else {
                url.searchParams.set("page", 2);
                window.location.href = url.href;
            }
        })
    }
}




// notify
function showNotification(message, type = "success") {
    let wrapper = document.getElementById("notification-wrapper");

    if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.id = "notification-wrapper";
        document.body.appendChild(wrapper);
    }

    const notif = document.createElement("div");
    notif.classList.add("notification", type);

    notif.innerHTML = `
        <span>${message}</span>
        <span class="close-btn">&times;</span>
    `;

    wrapper.appendChild(notif);

    notif.querySelector(".close-btn").addEventListener("click", () => closeNotif(notif));

    setTimeout(() => closeNotif(notif), 5000);
}

function closeNotif(notif) {
    notif.style.animation = "slideOut 0.2s forwards";
    setTimeout(() => notif.remove(), 200);
}
// end notify