// // function openSlideMenu() {
// //     document.getElementById('menu').style.width = '250px';
// //     document.getElementById('navigation').style.marginLeft = '190px';
// // }

// // function closeSlideMenu() {
// //     document.getElementById('menu').style.width = '0px';
// //     document.getElementById('navigation').style.marginLeft = '0px';
// // }



// // ==================Get Element of page product=============================
// let dialog_addproduct = document.querySelector('#addProduct_dialog');
// let nameProduct=document.querySelector('.name');
// let nameCategory=document.querySelector('.category');
// let netPrice=document.querySelector('.netPrice');
// let grossPrice=document.querySelector('.grossPrice');
// let quantityProduct=document.querySelector('.quantity');
// let descript=document.querySelector('.descript');
// let textarea=document.querySelector('textarea');
// let table=document.querySelector('.content-table');

// // ==================Get Element of page category==============================
// let dialog_addCategory=document.querySelector('.addcategory_dialog');
// let category_name=document.querySelector('.descriptofCategory');
// let tableCategory=document.querySelector('.content-table-category');
// console.log(dialog_addCategory, category_name,tableCategory);

// // ==========================show and hide element===========================
// function hide(element) {
//     element.style.display = "none";
// }
// function show(element) {
//     element.style.display = "block";
// }

// // ===============save localStorage==============================
// function saveStorage(){
//     localStorage.setItem("productDatas",JSON.stringify(productDatas));
//     localStorage.setItem("id", JSON.stringify(uniqueId));
// }

// // =====================load localStorage=========================
// function getProduct(){
//     let productStroge=JSON.parse(localStorage.getItem("productDatas"));
//     let idStorage=JSON.parse(localStorage.getItem("id"));
//     if(productStroge !=null){
//         productDatas=productStroge;
//         uniqueId=idStorage;
//     }
// }

// // ======================Category Data================
// let categoryData=[];
// let uniqueId_category=0;

// // ===================Product Data===================
// let productDatas=[];
// let uniqueId=0;

// // =======================add Category==================


// // =======================add product===========================
// function onAddProduct() {
//     show(dialog_addproduct);
// }

// // =====================cancel================
// function onCancel(e) {
//     hide(dialog_addproduct);
// }

// // ===============Add_product==========================
// function addProduct() {
//      hide(dialog_addproduct)
//     uniqueId += 1;
//     let object = {
//         id: uniqueId,
//         productName:nameProduct.value,
//         category:nameCategory.value,
//         quantity:quantityProduct.value,
//         price:netPrice.value,
//     };
//     productDatas.push(object);
//     saveStorage();
//     getProduct();
//     showPoduct()
//     clear()
//     window.location.reload()
// }
// // =================Showpoduct====================
// function showPoduct(){
//     const trs = document.querySelectorAll('tbody tr');
//     // Delete old table to store New table when we create edit or 
//     for (const tr of trs) {
//         tr.remove();
//     }
    
//     for(let i=0; i<productDatas.length;i++){
//         let tableRow=document.createElement('tr');
//         let tdId=document.createElement('td');
//         let tdName=document.createElement('td');
//         let tdCategory=document.createElement('td');
//         let tdQuantity=document.createElement('td');
//         let tdPrice=document.createElement('td');
//         let tdAction=document.createElement('td');

//         tdId.textContent=productDatas[i].id;
//         tdName.textContent=productDatas[i].productName;
//         tdCategory.textContent=productDatas[i].category;
//         tdQuantity.textContent=productDatas[i].quantity;
//         tdPrice.textContent=productDatas[i].price;
        
//         tableRow.appendChild(tdId);
//         tableRow.appendChild(tdName);
//         tableRow.appendChild(tdCategory);
//         tableRow.appendChild(tdQuantity);
//         tableRow.appendChild(tdPrice);
//         // tableRow.appendChild()

//         table.appendChild(tableRow);
        
//     }
    
// }
// // ===================clear==================
// function clear(){
//     nameProduct.value="";
//     nameCategory.value="";
//     netPrice.value="";
//     grossPrice.value=""
//     quantityProduct.value="";
//     textarea.value="";
// }
// let tbody=document.querySelector('tbody');

// getProduct()
// showPoduct()
// // localStorage.clear()
