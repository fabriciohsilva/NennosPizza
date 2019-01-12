import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';

//importing interfaces
import { Ingredient } from '../../interfaces/ingredient.interface';
import { Pizza } from '../../interfaces/pizza.interface';

//import providers
import { PizzaProvider } from '../../providers/pizza/pizza.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public basePrice = 4.00; 
  public pizzas: Array<Pizza>; 

  Ingredients: Array<Ingredient> = [
    {
      "price": 1,
      "name": "Mozzarella",
      "id": 1
    },
    {
      "price": 0.5,
      "name": "Tomato Sauce",
      "id": 2
    },
    {
      "price": 1.5,
      "name": "Salami",
      "id": 3
    },
    {
      "price": 2,
      "name": "Mushrooms",
      "id": 4
    },
    {
      "price": 4,
      "name": "Ricci",
      "id": 5
    },
    {
      "price": 2,
      "name": "Asparagus",
      "id": 6
    },
    {
      "price": 1,
      "name": "Pineapple",
      "id": 7
    },
    {
      "price": 3,
      "name": "Speck",
      "id": 8
    },
    {
      "price": 2.5,
      "name": "Bottarga",
      "id": 9
    },
    {
      "price": 2.2,
      "name": "Tuna",
      "id": 10
    }
  ];

  
  constructor(
    public navCtrl: NavController,
    private pizzaProvider: PizzaProvider,
    public loadingCtrl: LoadingController) {   
  }

  ionViewDidLoad() {
    this.pizzaProvider.getPizzasMenuFromDB()
      .then((data: Array<Pizza>) => {
        this.pizzas = data;

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
          let tempIngredient = this.Ingredients.filter(ingredient => {
              return ingredient.id === ingred });
              
          let ingredient: Ingredient = tempIngredient[0];
          
          ingredientsList.push(ingredient.name);
          pizza.price += ingredient.price;

        });     
        
          pizza.ingredients = [];
          pizza.ingredients = ingredientsList;
        });

        loading.dismiss();
      });//end this.pizzaProvider.getPizzas()
  }//end ionViewDidLoad()

  openCart(): void {
    this.navCtrl.push(ShoppingCartPage, {});
  }

}
