// =======================Get element========================
let totalPrice = document.querySelector('#total_price');
let checkout = document.querySelector('#checkout');
let searchprod = document.querySelector("#search-id");
let container = document.querySelector('.container');
let container_card = document.createElement('div');
let listCheckout = document.querySelector('.list-checkout');
// ================Product Data======================
let productDatas = [];
let cardall = [];

// ===============save localStorage==============================
function saveStorage() {
    localStorage.setItem("productDatas", JSON.stringify(productDatas));
    localStorage.setItem("cardall", JSON.stringify(cardall));
    localStorage.setItem('totalPricesList', JSON.stringify(totalPricesList));
}
// =====================load localStorage=========================
function getProduct() {
    let productStroge = JSON.parse(localStorage.getItem("productDatas"));
    let cardallstorage = JSON.parse(localStorage.getItem("cardall"));
    if (productStroge != null) {
        productDatas = productStroge;

    }
    if (cardallstorage != null) {
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
        id_prod.style.color = " #ccc"
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
        priceProd.textContent = productDatas[i].price + "$";
        priceprod.appendChild(priceProd);

        let btnAddChart = document.createElement('button');
        btnAddChart.setAttribute('class', 'btn-click')
        btnAddChart.textContent = "Add to chart";
        btnAddChart.addEventListener('click', addChart)

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

        if (name_prooduct.includes(searchprod.value.toLowerCase()) || id_product == searchprod.value) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    }

}


// function addChart(e) {
//     let cart = e.target.closest(".card-pro").children;
//     let obj = {
//         idPro: cart[0].textContent,
//         namePro: cart[1].firstElementChild.textContent,
//         qtyPro: cart[2].firstElementChild.textContent,
//         pricePro: cart[3].firstElementChild.textContent,
//         total: parseInt(cart[2].firstElementChild.textContent * cart[3].firstElementChild.textContent.replace('$', ''))
//     }
//     cardall.push(obj);
//     saveStorage();
//     getProduct();
//     showAddChart();
//     // window.location.reload()
// }

function addChart(e) {
    let cart = e.target.closest(".card-pro").children;
    let namePro = cart[1].firstElementChild.textContent;
    
    // Check if the product with the same name already exists
    let existingProduct = cardall.find(product => product.namePro === namePro);
    if (existingProduct) {
        alert("This product is already in the chart.");
        return; // Exit the function to prevent adding duplicates
    }

    let obj = {
        idPro: cart[0].textContent,
        namePro: namePro,
        qtyPro: cart[2].firstElementChild.textContent,
        pricePro: cart[3].firstElementChild.textContent,
        total: parseInt(cart[2].firstElementChild.textContent * cart[3].firstElementChild.textContent.replace('$', ''))
    };
    
    cardall.push(obj);
    saveStorage();
    getProduct();
    showAddChart();
}




// // =============Add product to chart======================
function showAddChart() {
    let result = 0;
    let trs = document.querySelectorAll('tbody tr');
    for (let tr of trs) {
        tr.remove()
    }
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
        inputQty.addEventListener('change', updateTotal)
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
        if (index !== -1) {
            cardall.splice(index, 1);
            saveStorage();
            getProduct();
            showAddChart();
        }
    }
}
// ===================update total====================
// function updateTotal(event) {
//     let index = event.target.closest('tbody tr').dataset.index;
//     cardall[index].qtyPro = event.target.value;
//     saveStorage()
//     showAddChart()

// }
// function checkOut() {
//     let trs = document.querySelectorAll('tbody tr');
//     for (let tr of trs) {
//         tr.remove()
//     }
    
// }

function updateTotal(event) {
    let index = event.target.closest('tbody tr').dataset.index;
    let currentQty = parseInt(event.target.value);
    let availableStock = parseInt(cardall[index].qtyPro);
    
    // Check if the entered quantity is greater than available stock
    if (currentQty > availableStock) {

        alert("Quantity cannot exceed available stock.");
        event.target.value = availableStock; // Reset the input to available stock
        return; // Exit the function
    }
    if (currentQty < 0) {
        alert("Quantity cannot be less than zero.");
        event.target.value = 0; // Reset the input to 0
        return; // Exit the function
    }

    cardall[index].qtyPro = currentQty;
    saveStorage();
    showAddChart();
}


function checkOut() {
    let totalPricesList = [];
    let totalPrice = 0;
    let tbody = document.querySelector('tbody');
    tbody.innerHTML = '';

    for (let i = 0; i < cardall.length; i++) {
        let tableRow = document.createElement('tr');
        let tdName = document.createElement('td');
        let tdQuantity = document.createElement('td');
        let tdPrice = document.createElement('td');
        let tdTotal = document.createElement('td');
        let tdAction = document.createElement('td');
        let btnDel = document.createElement('button');

        tdName.textContent = cardall[i].namePro;
        tdQuantity.textContent = cardall[i].qtyPro;
        tdPrice.textContent = cardall[i].pricePro;
        tdTotal.textContent = parseInt(cardall[i].qtyPro) * parseFloat(cardall[i].pricePro.replace('$', ''));
        totalPrice += parseInt(cardall[i].qtyPro) * parseFloat(cardall[i].pricePro.replace('$', ''));
        btnDel.textContent = 'Delete';
        btnDel.addEventListener('click', () => {
            cardall.splice(i, 1);
            saveStorage();
            checkOut();
        });

        tableRow.appendChild(tdName);
        tableRow.appendChild(tdQuantity);
        tableRow.appendChild(tdPrice);
        tableRow.appendChild(tdTotal);
        tableRow.appendChild(tdAction);
        tdAction.appendChild(btnDel);
        tbody.appendChild(tableRow);
    }

    totalPriceElement.textContent = `Total Price: ${totalPrice}$`;
    totalPricesList.push(totalPrice);
    // Save total price to localStorage
    localStorage.setItem('totalPricesList', JSON.stringify(totalPricesList));
}
// Initialize array to store total prices



// Call checkOut function when checkout button is clicked
checkout.addEventListener('click', checkOut);

// checkout.addEventListener('click', checkOut);

    
searchprod.addEventListener('keyup', searchProduct);
checkout.addEventListener('click', checkOut);
getProduct()
showCardpro()
showAddChart()
// localStorage.clear()
