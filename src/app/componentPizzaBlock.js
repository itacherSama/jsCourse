import {changeProperty, htmlToElement, insertTextInElem} from './addFunc';
import {pizzaSizes, pizzaTypes} from "./info";
import pizzaBlockItem from './../static-components/pizza-block.html';
import Cart from "./Cart";

class PizzaBlock {
    constructor(objPizza) {
        this.htmlblank = htmlToElement(pizzaBlockItem);
        this.startState = objPizza;
        this.activePizza = {
            price: objPizza.price[pizzaSizes.indexOf(objPizza.sizes[0])],
            type: pizzaTypes[objPizza.types[0]],
            size: objPizza.sizes[0],
            name: objPizza.name,
            imageUrl: objPizza.imageUrl,
            id: objPizza.id
        };
    }


   generateTemplate() {
       const nameBlock = this.htmlblank.querySelector('.pizza-block-name-js');
       const typesBlock = this.htmlblank.querySelector('.pizza-block-types-js');
       const sizesBlock = this.htmlblank.querySelector('.pizza-block-sizes-js');
       const priceBlock = this.htmlblank.querySelector('.pizza-block-price-js');
       const imgBlock = this.htmlblank.querySelector('.pizza-block_img-js');
       const buttonBlock = this.htmlblank.querySelector('.pizza-block__bot_count-js');

       buttonBlock.addEventListener('click', () => {
           Cart.addItem(this.activePizza);
       });

       typesBlock.addEventListener('click', (e) => {
           changeProperty.call(this, e, 'type');
       });

       sizesBlock.addEventListener('click', (e) => {
           changeProperty.call(this, e, 'size');
       });


       imgBlock.src = this.activePizza.imageUrl;
       nameBlock.innerHTML = this.startState.name;
       priceBlock.innerHTML = this.activePizza.price;

       insertTextInElem(typesBlock, pizzaTypes, this.startState.types, 'types');
       insertTextInElem(sizesBlock, pizzaSizes, this.startState.sizes, 'sizes');

       return this.htmlblank;
   }

   changePrice(val) {
       this.activePizza['price'] = this.startState.price[this.startState.sizes.indexOf(parseInt(val))];
       const priceBlock = this.htmlblank.querySelector('.pizza-block-price-js');
       priceBlock.innerHTML = this.activePizza['price'];
   }

}

export default PizzaBlock;