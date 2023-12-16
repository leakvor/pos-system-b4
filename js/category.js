// // ==================Get Element of page category==============================
let dialog_addCategory = document.querySelector('#addcategory_dialog');
let category_name = document.querySelector('.nameCategory');
let category_description = document.querySelector('.descriptofCategory');
let tableCategory = document.querySelector('.content-table-category');
let textarea = document.querySelector('textarea');
let searchCategory = document.querySelector('#search_category');

// // ==========================show and hide element===========================
function hide(element) {
    element.style.display = "none";
}
function show(element) {
    element.style.display = "block";
}

// // ===============save localStorage==============================
function saveStorage() {
    localStorage.setItem("categoryData", JSON.stringify(categoryData));
    localStorage.setItem("id", JSON.stringify(uniqueId_category));

}

// =====================load localStorage=========================
function getProduct() {
    let categoryStorage = JSON.parse(localStorage.getItem("categoryData"));
    let idStorage = JSON.parse(localStorage.getItem("id"));
    if (categoryStorage != undefined) {
        categoryData = categoryStorage;
        uniqueId_category = idStorage;
    } else {
        saveStorage()
    }
}
// // ======================Category Data================
let categoryData = [];
let uniqueId_category = 0;

// =======================add category===========================
function addCategory() {
    show(dialog_addCategory)
}
// =====================cancel================
function onCancel(e) {
    hide(dialog_addCategory);
}
// ===============Add Category==========================
function add_category() {
    hide(dialog_addCategory)
    uniqueId_category += 1
    let object_category = {
        id: uniqueId_category,
        categoryName: category_name.value,
        categoryDescript: category_description.value,
    };
    categoryData.push(object_category);
    saveStorage();
    getProduct();
    show_category()
    clear()
    window.location.reload()
}
// =================Showpoduct====================
function show_category() {
    const trs = document.querySelectorAll('tbody tr');
    for (const tr of trs) {
        tr.remove();
    }
    for (let i = 0; i < categoryData.length; i++) {
        let tableRow = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdAction = document.createElement('td');
        tdAction.className = "act"

        tdId.textContent = categoryData[i].id;
        tdName.textContent = categoryData[i].categoryName;
        let btnEdit = document.createElement('i');
        btnEdit.className = "fa fa-edit";
        btnEdit.style = "font-size:30px;color:blue"
        btnEdit.addEventListener("click", editCategory);

        let btnDel = document.createElement('i');
        btnDel.className = "material-icons"
        btnDel.textContent = "delete_forever";
        btnDel.style = "font-size:30px;color:red"
        btnDel.addEventListener("click", deleteCategory)


        tdAction.appendChild(btnEdit)
        tdAction.appendChild(btnDel)
        tableRow.appendChild(tdId);
        tableRow.appendChild(tdName);
        tableRow.appendChild(tdAction);

        document.querySelector('tbody').appendChild(tableRow);
        console.log(tableCategory);
    }

}
// ===================clear==================
function clear() {
    category_name.value = "";
    textarea.value = "";
}
let tbody = document.querySelector('tbody');

// ===================delete Category==================
function deleteCategory(e) {
    let isconfirm = confirm("Are you sure?")
    if (isconfirm) {
        let categoryId = e.target.closest('tr').firstElementChild.textContent;
        let index = categoryData.findIndex(category => category.id === Number(categoryId));
        categoryData.splice(index, 1);
        saveStorage()
        window.location.reload();
    }
    
}
// =================Edit Ctegory=================================
function editCategory(event) {
    let categoryName = event.target.closest('tr').firstElementChild.nextElementSibling.textContent;
    let index = categoryData.findIndex(category => category.categoryName === categoryName);

    console.log(index);
    let category = categoryData[index];
    console.log(category);
    show(dialog_addCategory)

    category_name.value = category.categoryName
    category_description.textContent = category.categoryDescript

    let btn = document.querySelector('menu').lastElementChild
    btn.textContent = "Edit"
    btn.removeAttribute("onclick")
    btn.setAttribute("onclick", `updateCategory(${index})`)
}
//  ===================Update Product========================
function updateCategory(index) {
    hide(dialog_addCategory)
    categoryData[index].categoryName = category_name.value,
        categoryData[index].categoryDescript = category_description.value,

        saveStorage()
    show_category()
    window.location.reload()
    let btnCreate = document.querySelector('menu').lastElementChild
    btnCreate.textContent = "Create"
    btnCreate.removeAttribute("onclick")
    btnCreate.setAttribute("onclick", addProduct)
}
getProduct()
show_category()




