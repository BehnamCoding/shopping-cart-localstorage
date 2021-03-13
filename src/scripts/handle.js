// imports
import ui from './ui';

const handleFunc = (function () {

    class Handle {
        constructor() {
            this.cardTag = document.querySelectorAll('.send-btn');
            this.table_body = document.querySelector('.table .table-body');
            this.product_count = document.querySelector('#pro-count');
        }

        addProduct() {
            let array = Array.from(this.cardTag);
            array.forEach(item => {

                item.addEventListener('click', e => {
                    ui.showMessage('add');
                    
                    let image = e.target.parentElement.parentElement.querySelector('img').src;
                    let title = e.target.parentElement.parentElement.querySelector('.card-body .card-title').textContent;
                    let price = e.target.parentElement.parentElement.querySelector('.card-body .price').textContent.split(' ')[2];
                    let id = e.target.parentElement.parentElement.querySelector('.btn').getAttribute('data-id');
                    
                    let output = '';

                    output = `
                    <tr data-id=${id}>
                    <td><img src="${image}" width="75" alt="image"></td>
                    <td class="title-table">${title}</td>
                    <td>${price}</td>
                    <td class="remove"><a href="#!">&times;</a></td>
                    </tr>
                    `

                    this.table_body.innerHTML += output;

                    this.porCount();

                    let data = {
                        image: image,
                        title: title,
                        price: price,
                        id: id
                    }

                    this.addProductToLocalStorage(data);

                })
            })
        }

        porCount() {
            this.product_count.textContent = this.table_body.children.length;
        }

        addProductToLocalStorage(data) {
            let array = '';

            if (localStorage.getItem('Products') === null) {
                array = [];
                array.push(data);
                localStorage.setItem('Products', JSON.stringify(array));
            } else {
                array = JSON.parse(localStorage.getItem('Products'));
                array.push(data);
                localStorage.setItem('Products', JSON.stringify(array));
            }
        }

        deleteProduct(e) {
            if (e.target.parentElement.classList.contains('remove')) {
                e.target.parentElement.parentElement.remove();
                this.porCount();

                let product = e.target.parentElement.parentElement.getAttribute('data-id');
                this.deleteProductFromLocalStorage(product);

                ui.showMessage('delete');
            }
        }

        deleteProductFromLocalStorage(product) {
            let array = JSON.parse(localStorage.getItem('Products'));

            array.forEach((pro, index) => {
                if (product === pro.id) {
                    array.splice(index, 1);

                    localStorage.setItem('Products', JSON.stringify(array));
                }
            })
        }

        clearAllProducts() {
            let allItems = document.querySelectorAll('.table .table-body tr');
            allItems.forEach(item => {
                item.remove();

                localStorage.clear();

                ui.showMessage('all');

                this.porCount();
            })
        }

    }

    // instance
    let handle = new Handle();

    // return methods
    return { // object to return methods in this class.
        addProduct: function () {
            return handle.addProduct();
        },
        porCount: function () {
            return handle.porCount();
        },
        deleteProduct: function (e) {
            return handle.deleteProduct(e);
        },
        clearAllProducts: function (e) {
            return handle.clearAllProducts(e);
        }
    }

})()

export default handleFunc; // export main function to use return object.