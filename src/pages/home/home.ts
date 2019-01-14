import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';

//importing interfaces
import { Ingredient } from '../../interfaces/ingredient.interface';
import { Pizza } from '../../interfaces/pizza.interface';

//import providers
import { PizzaProvider } from '../../providers/pizza/pizza.provider';
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public basePrice: number = 0; 
  public pizzas: Array<Pizza>;
  public ingredients: Array<Ingredient>;
  
  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private pizzaProvider: PizzaProvider,
    private shoppingCartProvider: ShoppingCartProvider,
    private toastCtrl: ToastController) {   
  }

  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      spinner: 'ios',
      content: ` <div class="custom-spinner-container">
                  <div class="custom-spinner-box">
                    Please wait...
                  </div>
              </div>`
    });
  
    loading.present();

    this.pizzaProvider.getPizzasMenuFromDB()
      .then((data: Array<Pizza>) => {
        this.pizzas = data;

        this.pizzaProvider.getBasePriceOnDB()
          .then((data: number) => { this.basePrice = data });
        
        loading.dismiss();
       
      });//end this.pizzaProvider.getPizzas()
  }//end ionViewDidLoad()

  
  public openCart(): void {
    this.navCtrl.push(ShoppingCartPage, {});
  }//end public openCart(): void

  public insertPizzaOnCart(pizza: Pizza): void {
    this.shoppingCartProvider.saveItemOnCart(pizza);
    let toast = this.toastCtrl.create({
      message: 'Added to cart',
      cssClass: 'custom-toast',
      duration: 3000,
      position: 'top'
    });

    toast.present();
  }//public insertPizzaOnCart(): void

}
