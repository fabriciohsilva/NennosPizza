import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app/app.config';
import { Ingredient } from '../../interfaces/ingredient.interface';
import { IngredientProvider } from '../ingredient/ingredient.provider';
import { Pizza } from '../../interfaces/pizza.interface';


@Injectable()
export class PizzaProvider {

  public basePrice: number = 0; 
  public pizzas: Pizza[];
  public ingredients: Array<Ingredient>;

  constructor(
    private ingredientProvider: IngredientProvider,
    public http: Http,
    private storage: Storage) {
  }//end constructor


  public getPizzasMenuFromDB() {
    return new Promise(resolve => {
      this.storage.ready()
        .then(() => {
          this.storage.get('Pizzas')
          .then((data) => {
            if (data === null) {
              resolve(this.savePizzaMenuOnDB());
            }else {
              this.savePizzaMenuOnDB();
              resolve(data);
            }
          });//end this.storage.get('Pizzas')
      });//end this.storage.ready()
    });//end return new Promise(resolve =>
  }//end public getPizzaFromDB()


  public savePizzaMenuOnDB() {
    return new Promise(resolve => {
      this.storage.ready()
      .then(() => {
        this.getPizzas().then((data: Array<Pizza>) => {
          this.loadIngredientsListNames(data)
          .then(data => {
            this.storage.set('Pizzas', data);      
            resolve(data);
          });
        });
      });
    });//end return new Promise(resolve =>
  }//end public getPizzaFromDB()


  private saveBasePriceOnDB(basePrice: number): void {
    this.storage.ready()
    .then(() => {
      this.basePrice = basePrice;
      this.storage.set('BasePrice', basePrice);
    });//end this.storage.ready()    
  }//private saveBasePriceOnDB(basePrice: number): void


  public getBasePriceOnDB() {
    return new Promise(resolve =>{
      this.storage.ready()
      .then(() => {
        this.storage.get('BasePrice')
        .then((data) => {

          if (data === null)
            resolve(0);
          else
            resolve(data);

        });//end this.storage.get('BasePrice')
      });//end this.storage.ready()
    });//end return new Promise(resolve =>
  }//end private saveBasePriceOnDB(basePrice: number): void


  private getPizzas() {
    return new Promise(resolve => {
      this.http.get(AppConfig.URLPIZZAS)
        .map(res => res.json())
        .subscribe(data => {
          this.saveBasePriceOnDB(data.basePrice);
          resolve( data.pizzas);
      });//end this.http.get(this.URL)
    });//end this.http.get(this.URL)    
  }//public getPizzas()


  private loadIngredientsListNames(pizzas: Array<Pizza>) {
    return new Promise(resolve => {
      this.ingredientProvider.getIngredientsListFromDB()
      .then((data: Array<Ingredient>) => {
        this.ingredients = data;

        pizzas.forEach((pizza) => {
          let ingredientsNames = [];

          pizza.price = this.basePrice;

          pizza.ingredients.forEach(ingred => {
            let tempIngredient = this.ingredients.filter(ingredient => {
                return ingredient.id === ingred });

            let ingredient: Ingredient = tempIngredient[0];
              
            ingredientsNames.push(ingredient.name);
            pizza.price += ingredient.price;
          });//end pizzaIngredients.forEach(ingred => {
          
          pizza.ingredientsNames = ingredientsNames;
        });//end pizzas.forEach((pizza) =>
        resolve(pizzas);
      });//end this.ingredientProvider.getIngredientsListFromDB()      
    });//end return new Promise(resolve => 
  }//private loadIngredientsListNames()

}//end export class PizzaProvider
