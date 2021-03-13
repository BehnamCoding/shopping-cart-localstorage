// imports
import handle from './handle';

const uiFunc = (function () {

    class Ui {
        constructor() {
            this.message_box = document.querySelector('.popup-message');
            this.message_text = document.querySelector('.popup-message .desc');
            this.table_body = document.querySelector('.table .table-body');
        }

        showMessage(state) {
            if (state === 'add') {
                this.message_box.classList.add('add');
                this.message_text.textContent = '1 Product Added.';
            } else if (state === 'delete') {
                this.message_box.classList.add('del');
                this.message_box.classList.remove('add');
                this.message_text.textContent = '1 Product Deleted.';
            } else if(state === 'all') {
                this.message_box.classList.add('del');
                this.message_box.classList.remove('add');
                this.message_text.textContent = 'All Products Deleted.';
            }

            this.message_box.classList.add('show');


            setTimeout(() => {
                this.removeMessageBox();
            }, 1000);
        }

        removeMessageBox() {
            let messageBox = document.querySelector('.popup-message');
            if (messageBox.classList.contains('show')) {
                messageBox.classList.remove('show');
            }
        }

        getProductsFromLocalStorage() {
            let array = JSON.parse(localStorage.getItem('Products'));

            array.forEach((product) => {
                this.table_body.innerHTML += `
                <tr data-id=${product.id}>
                    <td><img src="${product.image}" width="75" alt="image"></td>
                    <td class="title-table">${product.title}</td>
                    <td>${product.price}</td>
                    <td class="remove"><a href="#!">&times;</a></td>
                </tr>
               `

                handle.porCount();
            });
        }

    }

    // instance
    let ui = new Ui();

    // return methods
    return {
        showMessage: function (state) {
            return ui.showMessage(state);
        },
        porCount: function () {
            return ui.porCount();
        },
        getProductsFromLocalStorage: function () {
            return ui.getProductsFromLocalStorage();
        }
    }

})()

export default uiFunc; // export main function to use return object.