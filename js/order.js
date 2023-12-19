// =======================Get element========================
let totalPrice = document.querySelector('#total_price');
let checkout = document.querySelector('#checkout');
let searchprod = document.querySelector("#search-id");
let container = document.querySelector('.container');
let container_card=document.createElement('div');
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
    if (productStroge != undefined) {
        productDatas = productStroge;
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
        // btnAddChart.addEventListener('click',addChart_prod)

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

searchprod.addEventListener('keyup', searchProduct)
getProduct()
showCardpro()
