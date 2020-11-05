import {pizzaSizes, pizzaTypes} from './info';
import PizzaBlock from "./componentPizzaBlock";

export function insertItemsInDom(block, items) {
    if (Array.isArray(items)) {
        block.append(...items);
    } else {
        block.append(items);
    }
}

export function generatePizzaBlock(arrPizzas) {
    const pizzaBlock = document.querySelector('.content__box');
    const pizzaBlockItems = [];

    arrPizzas.forEach((item) => {
        pizzaBlockItems.push(new PizzaBlock(item).generateTemplate());
    })

    insertItemsInDom(pizzaBlock, pizzaBlockItems);
}

export function insertTextInElem(iterBlock, typeElems, possibleTypes, checkBy) {

        [].forEach.call(iterBlock.children, (el, idx) => {
            let item = typeElems[idx];

            if (checkBy === 'types' && !possibleTypes.some((el) => typeElems[el] === item)) {
                el.classList.add('disabled');
                el.setAttribute('type', true);
            } else if (checkBy === 'sizes' && !possibleTypes.some((el) => el === item)) {
                el.classList.add('disabled');
                el.setAttribute('size', true);
            }

            if (item === possibleTypes[0] || item === typeElems[possibleTypes[0]]) {
                el.classList.add('active');
            }

            /*if (checkBy === 'sizes') {
                item += ' см.';
            }*/

        el.innerHTML = item;
    });
}

export function changePage(page) {
    const root = document.getElementById('root');
    root.append(page);
}

export function htmlToElement(html) {
    let template = document.createElement('div');
    html = ''.trim.call(html); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.children[0];
}

export function changeProperty(e, property) {
    const kitClasses = e.target.classList;
    const checkClasses = !kitClasses.contains('active') && !kitClasses.contains('disabled');

    if (checkClasses) {
        const elements = e.target.parentElement.children;
        [].forEach.call(elements, (el) => {
            el.classList.remove('active');
        })

        kitClasses.add('active');
        this.activePizza[property] = e.target.innerText;
        if (property === 'size') {
            console.log(this)
            const val = parseInt(e.target.innerText);
            this.activePizza[property] = val;
            this.changePrice(val);

        }
    }

}