// =======================Get element========================
let totalPrice = document.querySelector('#total_price');
let checkout = document.querySelector('#checkout');
let searchprod = document.querySelector("#search-id");
let container = document.querySelector('.container');
let container_card=document.createElement('div');
let listCheckout = document.querySelector('.list-checkout');
// ================Product Data======================
let productDatas = [];
let cardall=[];

// ===============save localStorage==============================
function saveStorage() {
    localStorage.setItem("productDatas", JSON.stringify(productDatas));
    localStorage.setItem("cardall", JSON.stringify(cardall));
}
// =====================load localStorage=========================
function getProduct() {
    let productStroge = JSON.parse(localStorage.getItem("productDatas"));
    let cardallstorage = JSON.parse(localStorage.getItem("cardall"));
    if (productStroge != null) {
        productDatas = productStroge;
        
    }
    if(cardallstorage !=null){
        cardall = cardallstorage;
    }
    else {
        saveStorage()
    }
}
// ===================show Cardpro==========================
function showCardpro() {
    for (let i = 0; i < productDatas.length; i++) {
        let cardPro = document.createElement('div');
        cardPro.className = "card-pro"

        let idprod = document.createElement('p');
        idprod.textContent = "ID: ";
        let id_prod = document.createElement('span')
        id_prod.setAttribute('id', 'nameprod')
        id_prod.textContent = productDatas[i].id
        id_prod.style.color=" #ccc"
        idprod.appendChild(id_prod)

        let name = document.createElement('p');
        name.textContent = "Name Product: ";
        let nameprod = document.createElement('span')
        nameprod.setAttribute('id', 'nameprod')
        nameprod.textContent = productDatas[i].productName
        name.appendChild(nameprod)


        let Instock = document.createElement('p');
        Instock.textContent = "In stock: ";
        let stock = document.createElement('span');
        stock.setAttribute('id', 'stock');
        stock.textContent = productDatas[i].quantity;
        Instock.appendChild(stock)


        let priceprod = document.createElement('p');
        priceprod.textContent = "Price: ";
        let priceProd = document.createElement('span');
        priceProd.setAttribute('id', 'priceprod');
        priceProd.textContent = productDatas[i].price+"$";
        priceprod.appendChild(priceProd);

        let btnAddChart = document.createElement('button');
        btnAddChart.setAttribute('class', 'btn-click')
        btnAddChart.textContent = "Add to chart";
        btnAddChart.addEventListener('click',addChart)

        cardPro.appendChild(id_prod)
        cardPro.appendChild(name)
        cardPro.appendChild(Instock)
        cardPro.appendChild(priceprod)
        cardPro.appendChild(btnAddChart)

        container.appendChild(cardPro)
    }
}

// ========================search product========================
function searchProduct() {
    let allCard = document.querySelectorAll('.card-pro');
    for (let card of allCard) {
        let id_product = card.firstElementChild.textContent;
        let name_prooduct = card.firstElementChild.nextElementSibling.firstElementChild.textContent.toLowerCase();
        console.log(name_prooduct);

        if (name_prooduct.includes(searchprod.value.toLowerCase()) || id_product == searchprod.value) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }

}
// ===============update pro================
function addChart(e) {
    let cart = e.target.closest(".card-pro").children;
    let obj = {
        idPro: cart[0].textContent,
        namePro: cart[1].firstElementChild.textContent,
        qtyPro: cart[2].firstElementChild.textContent,
        pricePro: cart[3].firstElementChild.textContent,
        total: parseInt(cart[2].firstElementChild.textContent * cart[3].firstElementChild.textContent.replace('$', ''))
    }
    cardall.push(obj);
    saveStorage();
    getProduct();
    showAddChart();
    // window.location.reload()
}
    // // =============Add product to chart======================
function showAddChart() {
    let result = 0;
    let trs = document.querySelectorAll('tbody tr');
    for (let tr of trs) {
        tr.remove()
    }
    console.log(cardall);
    for (let i = 0; i < cardall.length; i++) {
        let tableRow = document.createElement('tr');
        tableRow.dataset.index = i;
        let tdId = document.createElement('td');
        tdId.textContent = cardall[i].idPro;
        // tdId.style.color = "white"

        let tdName = document.createElement('td');
        tdName.textContent = cardall[i].namePro;

        let tdQuantity = document.createElement('td');
        let inputQty = document.createElement('input');
        inputQty.setAttribute('type', 'number');
        inputQty.value = cardall[i].qtyPro;
        // inputQty.addEventListener('change', updateTiotal)
        tdQuantity.appendChild(inputQty);

        let tdPrice = document.createElement('td');
        tdPrice.textContent = cardall[i].pricePro;

        let tdTotal = document.createElement('td');
        tdTotal.textContent = parseInt(cardall[i].qtyPro * cardall[i].pricePro.replace('$', '')) + "$";
        result += parseInt(cardall[i].qtyPro * cardall[i].pricePro.replace('$', ''))

        let tdAction = document.createElement('td');
        let btnDel = document.createElement('i');
        btnDel.setAttribute("class", 'qty')
        btnDel.className = "material-icons";
        btnDel.textContent = "delete";
        btnDel.style.color = "red";
        btnDel.addEventListener("click", delChartList)
        tdAction.appendChild(btnDel);

        // tableRow.appendChild(tdId)
        tableRow.appendChild(tdName);
        tableRow.appendChild(tdQuantity)
        tableRow.appendChild(tdPrice);
        tableRow.appendChild(tdTotal);
        tableRow.appendChild(tdAction)
        document.querySelector('tbody').appendChild(tableRow)
    }
    totalPrice.textContent = `${result}$`;
}
// ==================remove chartList=====================
function delChartList(event) {
    let isConfirm = confirm("Are you sure to delete?")
    if (isConfirm) {
        let index = event.target.closest('tbody tr').dataset.index;
        console.log(index);
        if (index !== -1) {
            cardall.splice(index, 1);
            saveStorage();
            getProduct();
            showAddChart();
        }
    }
}

searchprod.addEventListener('keyup', searchProduct)
getProduct()
showCardpro()
showAddChart()
