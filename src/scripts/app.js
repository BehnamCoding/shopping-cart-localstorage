// imports
import handle from './handle';
import ui from './ui';


// variables
let table_body = document.querySelector('.table .table-body');
let btn_clear = document.querySelector('#clear-all');


// loadAllEvents
loadAllEvents();
function loadAllEvents() {

    addProduct();

    document.addEventListener('DOMContentLoaded' , getProductsOnLoad)

    table_body.addEventListener('click' , deleteProduct);

    btn_clear.addEventListener('click' , clearAllProducts)

}

// functions

// addProduct
function addProduct() {
    handle.addProduct();
}

// getProductsOnLoad
function getProductsOnLoad() {
    ui.getProductsFromLocalStorage();
}

// deleteProduct
function deleteProduct(e) {
    handle.deleteProduct(e);
}

// clearAllProducts
function clearAllProducts() {
    handle.clearAllProducts();
}