import db from './db';
import './scss/app.scss';

db.pizzas.forEach((pizza) => {
    console.log(pizza);
})