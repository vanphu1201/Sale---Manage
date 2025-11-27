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
        checkBoxs.forEach(e => {
            e.checked =(e.checked == true ? false : true);
        })
    })
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
