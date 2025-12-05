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

// upload img preview
const imgInp = document.querySelector("#imageUpload");
const imgPreview = document.querySelector("#img-preview");
if(imgInp && imgPreview) {
  imgInp.addEventListener("change", event => {
    const [file] = imgInp.files
    if (file) {
      imgPreview.src = URL.createObjectURL(file);
    }
  });
}


// End upload img preview


// Toggle description expansion
function toggleDescription() {
  const descriptionContent = document.getElementById('descriptionContent');
  const readMoreBtn = document.querySelector('.read-more');
  
  if (descriptionContent.classList.contains('expanded')) {
    descriptionContent.classList.remove('expanded');
    readMoreBtn.textContent = 'Xem thêm';
  } else {
    descriptionContent.classList.add('expanded');
    readMoreBtn.textContent = 'Thu gọn';
  }
}
// End Toggle description expansion
