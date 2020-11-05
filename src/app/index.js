import './../scss/app.scss';
import {generatePizzaBlock, changePage, htmlToElement} from './addFunc';

import indexHtml from './../static-components/index.html';
import cartHtml from './../static-components/cart.html';
import cartEmptyHtml from './../static-components/cart-empty.html';
import cartItamHtml from './../static-components/cart-item.html';
import Cart from "./Cart";
import {fetchPizzas} from "../api/api";
import {sortNames} from "./info";

window.cart = Cart;


changePage(htmlToElement(indexHtml));

fetchPizzas(sortNames[0]).then((pizzas) => {
    generatePizzaBlock(pizzas);

})


