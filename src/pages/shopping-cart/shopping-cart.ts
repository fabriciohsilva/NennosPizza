import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DrinksPage } from '../drinks/drinks';

import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart.provider';

import { Cart } from '../../interfaces/cart.interface';
import { Drink } from '../../interfaces/drink.interface';
import { Pizza } from '../../interfaces/pizza.interface';

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  public cart: Cart;
  public pizzas: Array<Pizza>;
  public drinks: Array<Drink>;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingCartProvider: ShoppingCartProvider) {
  }


  ionViewWillEnter() {
    this.shoppingCartProvider.getCartFromDB()
      .then((data: Cart) => {
        console.log('data: ', data);
        alert(data);
        this.pizzas = data.pizzas;
        this.drinks = data.drinks;
      });
  }//end ionViewDidLoad()


  openDrinks(): void {
    this.navCtrl.push(DrinksPage, {});
  }

  public checkout(): void {
    this.shoppingCartProvider.postCheckout();
  }//end public checkout(): void

}
