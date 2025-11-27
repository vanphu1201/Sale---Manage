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

