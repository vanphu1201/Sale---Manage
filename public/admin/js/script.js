// Sidebar toggle for mobile
document.querySelector('.sidebar-toggle').addEventListener('click', function() {
    document.querySelector('.sidebar').classList.toggle('active');
});
// End Sidebar toggle for mobile

// Check box change multi
const checkBoxAll = document.querySelector("input[name='check-all']");
if (checkBoxAll) {
    checkBoxAll.addEventListener("change", e => {
        const checkBoxs = document.querySelectorAll("input[name='check']");
        if (checkBoxAll.checked) {
            checkBoxs.forEach(e => {
                e.checked = true;
            })
        } else {
            checkBoxs.forEach(e => {
                e.checked = false;
            })
        }
    });
}


const checkBoxs = document.querySelectorAll("input[name='check']");
if (checkBoxs) {
    checkBoxs.forEach( checkBox => {
        checkBox.addEventListener("change", e => {
            e.checked =(e.checked == true ? false : true);
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


// Sidebar toggle for mobile
document.querySelector('.sidebar-toggle').addEventListener('click', function () {
    document.querySelector('.sidebar').classList.toggle('active');
});

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

      
      // Update filter counts
      function updateFilterCounts() {
        const activeRows = document.querySelectorAll('tr[data-status="active"]').length;
        const inactiveRows = document.querySelectorAll('tr[data-status="inactive"]').length;
        const totalRows = activeRows + inactiveRows;
        
        // Update filter button counts
        document.querySelector('[data-filter="all"] .filter-count').textContent = totalRows;
        document.querySelector('[data-filter="active"] .filter-count').textContent = activeRows;
        document.querySelector('[data-filter="inactive"] .filter-count').textContent = inactiveRows;
      }
      
      // Show notification
      function showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} position-fixed top-0 start-50 translate-middle-x mt-3`;
        notification.style.zIndex = '9999';
        notification.style.minWidth = '300px';
        notification.innerHTML = `
          <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
            ${message}
          </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
          notification.style.opacity = '0';
          notification.style.transition = 'opacity 0.5s';
          setTimeout(() => {
            document.body.removeChild(notification);
          }, 500);
        }, 3000);
      }
    
      
      // Pagination
      document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', function() {
          if (!this.querySelector('i')) {
            document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            // In a real application, you would load the corresponding page
          }
        });
      });
      
      // Close sort menu when clicking outside
      document.addEventListener('click', function(event) {
        const sortDropdown = document.querySelector('.sort-dropdown');
        const sortMenu = document.getElementById('sortMenu');
        
        if (!sortDropdown.contains(event.target)) {
          sortMenu.classList.remove('show');
        }
      });

