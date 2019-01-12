import { Pizza } from './pizza.interface';
import { Drink } from './drink.interface';

export interface Cart {
    pizzas: Array<Pizza>,
    drinks: Array<Drink> 
}