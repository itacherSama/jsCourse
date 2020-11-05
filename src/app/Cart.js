import {findTotalByProps, performOpItem} from "./utils";


class Cart {

    constructor() {
        this.state = {
            items: {},
            totalItems: 0,
            totalPrice: 0,
        }
    }
    addItem(item, operation = '+') {
        const activeItem = Object.assign({}, item);
        const newItems = performOpItem(this.state.items[activeItem.id], activeItem, operation);
        const newState = {
            ...this.state,
            items: {
                ...this.state.items,
                [activeItem.id]: newItems
            }
        }


        const [totalPrice, totalItems] = findTotalByProps(newState.items, ['totalPrice', 'totalItems']);

        this.state = {
            ...newState,
            totalItems,
            totalPrice
        };

        this.refreshButtonCart();

    }

    refreshButtonCart() {
        const btn = document.querySelector('.button--cart-js');
        if (!btn) {
            return false;
        }
        const btnCopy = btn.cloneNode(true);
        const totalPrice = btnCopy.querySelector('.button-cart-price-js');
        const totalItems = btnCopy.querySelector('.button-cart-count-js');
        totalPrice.innerHTML = this.state.totalPrice;
        totalItems.innerHTML = this.state.totalItems;
        btn.parentElement.replaceChild(btnCopy, btn);
    }

    refreshHtml() {

    }
}

export default new Cart();