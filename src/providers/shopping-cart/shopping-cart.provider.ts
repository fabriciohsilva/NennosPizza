import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Pizza } from '../../interfaces/pizza.interface';
import { Drink } from '../../interfaces/drink.interface';
import { CartItem } from '../../interfaces/cart.interface';
import { AppConfig } from '../../app/app.config';

@Injectable()
export class ShoppingCartProvider {

  constructor (
    public http: Http,
    private storage: Storage) {
      this.storage.ready()
        .then(() => {
          this.storage.get('Cart')
          .then((data) => {
            if (!data)
            this.storage.set('Cart', []);
          });
        });
  }//end constructor


  public getCartFromDB() {
    return new Promise(resolve =>{
      this.storage.ready()
        .then(() => {
          this.storage.get('Cart')
          .then((data) => {
            resolve(data);
          });
        });
    });
  }//end public getIngredientFromDB()


  public saveItemOnCart(pizza: Pizza, drink?: Drink) {
    this.storage.ready()
      .then(() => {        
        this.storage.get('Cart')
        .then((data) => {
          let items: Array<CartItem> = data;
          if (pizza)
            items.push({item: pizza, type: 'p'});
          
          if (drink)
            items.push({item: drink, type: 'd'});

          this.storage.set('Cart', items);
        });
    });     
  }//end public setPizzaOnDB()

  public saveCartOnDB(cart: Array<CartItem>): void {
    this.storage.ready()
      .then(() => {
        this.storage.set('Cart', cart);
    });
  }


  public postCheckout() {
    return new Promise((resolve, reject) =>{
      this.storage.ready()
        .then(() => {        
          this.storage.get('Cart')
          .then((data) => {
            let cart: Array<CartItem> = data;
            let pizzas: Array<Pizza> = [];
            let drinks: Array<Drink> = [];

            cart.forEach(item => {
              if ( item.type = 'p' ) {              
                pizzas.push({ name: item.item.name, ingredients: item.item.ingredients }); //removing optional fields of pizza
              }
              else  {
                drinks.push( item.item);
              }
            });//end cart.forEach(item =>

            var headers = new Headers();
            headers.append("Accept", 'application/json');
            headers.append('Content-Type', 'application/json' );

            const requestOptions = new RequestOptions({ headers: headers });

            let postData = {
                pizzas: pizzas,
                drinks: drinks
            };

            this.http.post(AppConfig.URLCHECKOUT, postData, requestOptions)
            .toPromise()
            .then((response) => {
              this.storage.set('Cart', []);
              resolve(response);              
            })
            .catch((err) => reject(err) );
          });
      });
    });
  }//end public postCheckout()

}
