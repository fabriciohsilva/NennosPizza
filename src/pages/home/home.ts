import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';

//importing interfaces
import { Ingredient } from '../../interfaces/ingredient.interface';
import { Pizza } from '../../interfaces/pizza.interface';

//import providers
import { PizzaProvider } from '../../providers/pizza/pizza.provider';
import { IngredientProvider } from '../../providers/ingredient/ingredient.provider';
import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public basePrice = 4.00; 
  public pizzas: Array<Pizza>;
  public ingredients: Array<Ingredient>;
  
  constructor(
    private ingredientProvider: IngredientProvider,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private pizzaProvider: PizzaProvider,
    private shoppingCartProvider: ShoppingCartProvider) {   
  }

  ionViewDidLoad() {
    this.pizzaProvider.getPizzasMenuFromDB()
      .then((data: Array<Pizza>) => {
        this.pizzas = data;

        this.ingredientProvider.getIngredientsListFromDB()
        .then((data: Array<Ingredient>) => {
          this.ingredients = data;      

          let loading = this.loadingCtrl.create({
            spinner: 'ios',
            content: ` <div class="custom-spinner-container">
                        <div class="custom-spinner-box">
                          Wait...
                        </div>
                    </div>`
          });
        
          loading.present();   
        
    
        this.pizzas.forEach((pizza) => {
          let ingredientsList = [];
          
          let pizzaIngredients = pizza.ingredients;
          pizza.price = this.basePrice;

          pizzaIngredients.forEach(ingred => {
            let tempIngredient = this.ingredients.filter(ingredient => {
                return ingredient.id === ingred });
                
            let ingredient: Ingredient = tempIngredient[0];
            
            ingredientsList.push(ingredient.name);
            pizza.price += ingredient.price;

          });     
          
            pizza.ingredients = [];
            pizza.ingredients = ingredientsList;
          });

          loading.dismiss();
      });//end
      });//end this.pizzaProvider.getPizzas()
  }//end ionViewDidLoad()

  public openCart(): void {
    this.navCtrl.push(ShoppingCartPage, {});
  }//end public openCart(): void

  public insertPizzaOnCart(pizza: Pizza): void {
    this.shoppingCartProvider.saveItemOnCart(pizza);
  }//public insertPizzaOnCart(): void

}
