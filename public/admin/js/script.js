// Search product 
const formSearch = document.querySelector("form[form-search]");
if (formSearch) {
    const url = new URL(window.location.href);
    formSearch.addEventListener("submit", e => {
        e.preventDefault();
        const searchValue = e.target.elements[0].value;
        if (searchValue) {
            url.searchParams.set("search", searchValue);
            window.location.href = url.href;
        } else {
            url.searchParams.delete("search");
            window.location.href = url.href;
        }
    });
}

// End Search product 
