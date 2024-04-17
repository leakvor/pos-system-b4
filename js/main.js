let in_stock=document.querySelector('.stock');
let Category_total=document.querySelector('.Category');
let sold_out=document.querySelector('.sold_out');
let inCome=document.querySelector('.income');



// ===============save localStorage==============================
function saveStorage() {
    localStorage.setItem("categoryData", JSON.stringify(categoryData));
    localStorage.setItem("productDatas", JSON.stringify(productDatas));
    localStorage.setItem("idpro", JSON.stringify(uniqueId));
    localStorage.setItem('totalPricesList', JSON.stringify(totalPricesList));
}


// =====================load localStorage=========================
function getProduct() {
    let categoryStorage = JSON.parse(localStorage.getItem("categoryData"));
    let productStroge = JSON.parse(localStorage.getItem("productDatas"));
    let uniqueIdStorage = JSON.parse(localStorage.getItem("idpro"));
    let orderPrice=JSON.parse(localStorage.getItem("totalPricesList"))
    if (productStroge != undefined) {
        categoryData = categoryStorage;
        productDatas = productStroge;
        uniqueId = uniqueIdStorage;
        totalPricesList=orderPrice;
    }
    else {
        saveStorage()
    }
}
// // =================Showpoduct====================
function showPoduct() {
    const trs = document.querySelectorAll('tbody tr');
    for (const tr of trs) {
        tr.remove();
    }
    for (let i = 0; i < productDatas.length; i++) {
        let tableRow = document.createElement('tr');
        let tdId = document.createElement('td');
        let tdName = document.createElement('td');
        let tdCategory = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdAmount=document.createElement('td');

        
        tdId.textContent = productDatas[i].id;
        tdName.textContent = productDatas[i].productName;
        tdCategory.textContent = productDatas[i].category;
        tdPrice.textContent = productDatas[i].price + "$";
        tdAmount.textContent=productDatas[i].quantity;

        tableRow.appendChild(tdId);
        tableRow.appendChild(tdName);
        tableRow.appendChild(tdCategory);
        tableRow.appendChild(tdPrice);
        tableRow.appendChild(tdAmount);

        document.querySelector("tbody").appendChild(tableRow);

    }
}


// console.log(document.querySelector('table'));
function clear() {
    nameProduct.value = "";
    nameCategory.value = "";
    netPrice.value = "";
    grossPrice.value = ""
    quantityProduct.value = "";
    textarea.value = "";
}
let tbody = document.querySelector('tbody');

getProduct()
let allprice=0;
for (let i = 0; i < productDatas.length; i++){
    allprice+= productDatas[i].price
}
in_stock.textContent= productDatas.length ;
Category_total.textContent=categoryData.length;
sold_out.textContent=totalPricesList.length;
inCome.textContent=allprice +" $";

showPoduct()

