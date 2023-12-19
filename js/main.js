
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
        let tdselprogress=document.createElement('td');

        if(i%2==0){
            let icon=document.querySelector('i');
            icon.className="material-icons";
            icon.textContent="call_made";
            tdselprogress.appendChild(icon);
        }else{
            let icons=document.querySelector('i');
            icons.className="material-icons";
            icons.textContent="call_received";
            tdselprogress.appendChild(icons);
        }
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
        tableRow.appendChild(tdselprogress)

        document.querySelector("tbody").appendChild(tableRow);

    }
}
console.log(document.querySelector('table'));
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
showPoduct()
