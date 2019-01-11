import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShoppingCartPage } from '../shopping-cart/shopping-cart';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  BasePrice = 4.00;

  Ingredients: Array<any> = [
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

  Pizzas: Array<any> = [
    {
      "ingredients": [
        1,
        2
      ],
      "name": "Margherita",
      "imageUrl": "https://cdn.pbrd.co/images/M57yElqQo.png"
    },
    {
      "ingredients": [
        1,
        5
      ],
      "name": "Ricci",
      "imageUrl": "https://cdn.pbrd.co/images/M58jWCFVC.png"
    },
    {
      "ingredients": [
        1,
        2,
        3,
        4
      ],
      "name": "Boscaiola",
      "imageUrl": "https://cdn.pbrd.co/images/tOhJQ5N3.png"
    },
    {
      "ingredients": [
        1,
        5,
        6
      ],
      "name": "Primavera",
      "imageUrl": "https://cdn.pbrd.co/images/M57VcfLGQ.png"
    },
    {
      "ingredients": [
        1,
        2,
        7,
        8
      ],
      "name": "Hawaii",
      "imageUrl": "https://cdn.pbrd.co/images/M57lNSLnC.png"
    },
    {
      "ingredients": [
        1,
        9,
        10
      ],
      "name": "Mare Bianco"
    },
    {
      "ingredients": [
        1,
        2,
        4,
        8,
        9,
        10
      ],
      "name": "Mari e monti",
      "imageUrl": "https://cdn.pbrd.co/images/M57K6OFiU.png"
    },
    {
      "ingredients": [
        1,
        9
      ],
      "name": "Bottarga",
      "imageUrl": "https://cdn.pbrd.co/images/M57aGTmgA.png"
    },
    {
      "ingredients": [
        1,
        2,
        9,
        6
      ],
      "name": "Boottarga e Asparagi",
      "imageUrl": "https://cdn.pbrd.co/images/4O6T9RQLX.png"
    },
    {
      "ingredients": [
        1,
        5,
        6
      ],
      "name": "Ricci e Asparagi",
      "imageUrl": "https://cdn.pbrd.co/images/4O70NDkMl.png"
    }
  ];

  
  constructor(public navCtrl: NavController) {
  }

  ionViewDidLoad(){
    this.Pizzas.forEach((pizza) => {
      let ingredientsList = [];
      
      let pizzaIngredients = pizza.ingredients;
      pizza.price = this.BasePrice;
      
      // let ingredient = this.Ingredients.filter((ingredient) => {
      //    return pizza.ingredients.indexOf(ingredient.id) > -1;
      //   });
      //   console.log('ingredient: ', ingredient); 
        
      // ingredientsList.push(ingredient.name);
      // pizza.price += ingredient.price;

      pizzaIngredients.forEach(ingred => {
        let ingredient = this.Ingredients.filter(ingredient => { return ingredient.id === ingred });
        ingredient = ingredient[0];
        
        ingredientsList.push(ingredient.name);
        pizza.price += ingredient.price;

      });     
      
      pizza.ingredients = [];
      pizza.ingredients = ingredientsList;

      console.log('pizza ', pizza);
    });
  }

  openCart() {
    this.navCtrl.push(ShoppingCartPage, {});
  }

}
