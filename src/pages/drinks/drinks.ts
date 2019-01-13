import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//importing interfaces
import { Drink } from '../../interfaces/drink.interface';

//import providers
import { DrinkProvider } from '../../providers/drink/drink.provider';
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart.provider';


@IonicPage()
@Component({
  selector: 'page-drinks',
  templateUrl: 'drinks.html',
})
export class DrinksPage {

  public drinks: Array<Drink>;
  
  constructor(
    private drinkProvider: DrinkProvider,
    public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingCartProvider: ShoppingCartProvider) {
  }

  ionViewDidLoad() {
    this.drinkProvider.getDrinksMenuFromDB()
      .then((data: Array<Drink>) => {
        this.drinks = data;
      });
  }

  public insertDrinkOnCart(drink: Drink): void {
    this.shoppingCartProvider.saveItemOnCart(null, drink);
  }//public insertPizzaOnCart(): void

}
