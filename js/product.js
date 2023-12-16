// ==================Get Element of page product=============================
let dialog_addproduct = document.querySelector('#addProduct_dialog');
let dialog_view = document.querySelector('#view_dialog');
let optionCategory = document.querySelector('#option_filter')
let nameProduct = document.querySelector('.name');
let nameCategory = document.querySelector('.category');
let selection = document.querySelector('#optionOfcategory');
let netPrice = document.querySelector('.netPrice');
let grossPrice = document.querySelector('.grossPrice');
let quantityProduct = document.querySelector('.quantity');
let descript = document.querySelector('.descript');
let textarea = document.querySelector('textarea');
let table = document.querySelector('.content-table');
let tbody = document.querySelector('tbody');
let searchProduct = document.querySelector('#search_product');
let showpro = document.querySelector('.proName');
let showCatategory = document.querySelector('.proCategory');
let showQuantity = document.querySelector('.showquantity');
let showStock = document.querySelector('.instock');
let showNetprice=document.querySelector('.netprice');
let showGrossprice=document.querySelector('.grossprice');
let showDescription=document.querySelector('.showdescription');
// ===================Product Data===================
let productDatas = [];
let categoryData = [];
let uniqueId = 0;

// ==========================show and hide element===========================
function hide(element) {
    element.style.display = "none";
}
function show(element) {
    element.style.display = "block";
}



// ===============save localStorage==============================
function saveStorage() {
    localStorage.setItem("categoryData", JSON.stringify(categoryData));
    localStorage.setItem("productDatas", JSON.stringify(productDatas));
    localStorage.setItem("idpro", JSON.stringify(uniqueId));
}


// =====================load localStorage=========================
function getProduct() {
    let categoryStorage = JSON.parse(localStorage.getItem("categoryData"));
    let productStroge = JSON.parse(localStorage.getItem("productDatas"));
    let uniqueIdStorage = JSON.parse(localStorage.getItem("idpro"));
    if (productStroge != undefined) {
        categoryData = categoryStorage;
        productDatas = productStroge;
        uniqueId = uniqueIdStorage;
    }
    else {
        saveStorage()
    }
}
// ===============Add_product==================
function addProduct() {
    hide(dialog_addproduct)
    uniqueId += 1;
    let object = {
        id: uniqueId ,
        productName: nameProduct.value,
        category:selection.value,
        quantity: quantityProduct.value,
        gross_price: grossPrice.value,
        price: netPrice.value,
        description: descript.value
    };
    productDatas.push(object);
    saveStorage();
    getProduct();
    showPoduct()
    clear()
    window.location.reload()
}

// =======================add product===========================
function onAddProduct() {
    show(dialog_addproduct);
}

// =====================cancel================
function onCancel(e) {
    hide(dialog_addproduct);
    hide(dialog_view)
}
// =================Showpoduct====================
function showPoduct() {
    const trs = document.querySelectorAll('tbody tr');
    console.log(trs);
    for (const tr of trs) {
        tr.remove();
    }
    for (let i = 0; i < productDatas.length; i++) {
        let tableRow = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCategory = document.createElement('td');
        let tdQuantity = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdAction = document.createElement('td');
        tdAction.className="act"
        
        let btnEdit = document.createElement('i');
        btnEdit.className = "fa fa-edit";
        btnEdit.style = "font-size:30px;color:blue"
        // btnEdit.addEventListener("click", editProduct);

        let btnDel = document.createElement('i');
        btnDel.className = "material-icons"
        btnDel.textContent = "delete_forever";
        btnDel.style = "font-size:30px;color:red"
        // btnDel.addEventListener("click", deleteProduct)

        let btnView = document.createElement('i');
        btnView.className="fa fa-eye";
        btnView.style="font-size:30px;color:gray"
        btnView.addEventListener("click", viewProduct)



        tdId.textContent = productDatas[i].id;
        tdName.textContent = productDatas[i].productName;
        tdCategory.textContent = productDatas[i].category;
        tdQuantity.textContent = productDatas[i].quantity;
        tdPrice.textContent = productDatas[i].gross_price;
        tdAction.appendChild(btnEdit)
        tdAction.appendChild(btnDel)
        tdAction.appendChild(btnView)

        tableRow.appendChild(tdId);
        tableRow.appendChild(tdName);
        tableRow.appendChild(tdCategory);
        tableRow.appendChild(tdQuantity);
        tableRow.appendChild(tdPrice);
        tableRow.appendChild(tdAction)

        document.querySelector('tbody').appendChild(tableRow);


    }
}
// ===================clear==================
function clear() {
    nameProduct.value = "";
    netPrice.value = "";
    grossPrice.value = ""
    quantityProduct.value = "";
    textarea.value = "";
}
getProduct()
showPoduct()
for(let j=0; j<categoryData.length; j++){
    let option=document.createElement('option')
    let option1=document.createElement('option')
    option.setAttribute('value',categoryData[j].categoryName)
    option1.setAttribute('value',categoryData[j].categoryName)
    option.textContent=categoryData[j].categoryName;
    option1.textContent=categoryData[j].categoryName;
    selection.appendChild(option1)
    optionCategory.appendChild(option) 
}
// localStorage.clear()
// ====================view product========================================
function viewProduct(event) {
    show(dialog_view)
    let productId = event.target.closest('tr').firstElementChild.textContent;
    let product = productDatas.find(product => product.id === Number(productId));
    showpro.textContent=product.productName;
    showCatategory.textContent=product.category;
    showQuantity.textContent=product.quantity;
    console.log(showQuantity);
    console.log(product.quantity);
    showNetprice.textContent=product.price;
    showGrossprice.textContent=product.gross_price;
    showDescription.textContent=product.description;
    
}