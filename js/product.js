// ==================Get Element of page product=============================
let dialog_addproduct = document.querySelector('#addProduct_dialog');
let nameProduct=document.querySelector('.name');
let nameCategory=document.querySelector('.category');
let netPrice=document.querySelector('.netPrice');
let grossPrice=document.querySelector('.grossPrice');
let quantityProduct=document.querySelector('.quantity');
let descript=document.querySelector('.descript');
let textarea=document.querySelector('textarea');
let table=document.querySelector('.content-table');

// ==========================show and hide element===========================
function hide(element) {
    element.style.display = "none";
}
function show(element) {
    element.style.display = "block";
}
// ===============save localStorage==============================
function saveStorage(){
    localStorage.setItem("productDatas",JSON.stringify(productDatas));
    localStorage.setItem("id", JSON.stringify(uniqueId));
}

// =====================load localStorage=========================
function getProduct(){
    let productStroge=JSON.parse(localStorage.getItem("productDatas"));
    let idStorage=JSON.parse(localStorage.getItem("id"));
    if(productStroge !=null){
        productDatas=productStroge;
        uniqueId=idStorage;
    }
}

// ===================Product Data===================
let productDatas=[];
let uniqueId=0;

// =======================add product===========================
function onAddProduct() {
    show(dialog_addproduct);
}



// ===============Add_product==========================
function addProduct() {
    hide(dialog_addproduct)
   uniqueId += 1;
   let object = {
       id: uniqueId,
       productName:nameProduct.value,
       category:nameCategory.value,
       quantity:quantityProduct.value,
       price:netPrice.value,
   };
   productDatas.push(object);
   saveStorage();
   getProduct();
   showPoduct()
   clear()
   window.location.reload()
}
// =================Showpoduct====================


  
































// ===================clear==================
function clear(){
   nameProduct.value="";
   nameCategory.value="";
   netPrice.value="";
   grossPrice.value=""
   quantityProduct.value="";
   textarea.value="";
}


getProduct()
showPoduct()