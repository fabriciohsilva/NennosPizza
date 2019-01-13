import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Pizza } from '../../interfaces/pizza.interface';
import { Drink } from '../../interfaces/drink.interface';
import { Cart } from '../../interfaces/cart.interface';

@Injectable()
export class ShoppingCartProvider {

  private URL: string = 'http://posttestserver.com/post.php';

  constructor (
    public http: Http,
    private storage: Storage) {
      this.storage.ready()
        .then(() => {
          this.storage.get('Cart')
          .then((data) => {
            if (!data)
            this.storage.set('Cart', {
              "pizzas" : [],
              "drinks" : []
            });
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
    console.log('');
    this.storage.ready()
      .then(() => {        
        this.storage.get('Cart')
        .then((data) => {
          let cart: Cart = data;
          if (pizza)
            cart.pizzas.push(pizza);
          
          if (drink)
            cart.drinks.push(drink);

          this.storage.set('Cart', cart);
        });
    });     
  }//end public setPizzaOnDB()

  public postCheckout() {
    this.storage.ready()
      .then(() => {        
        this.storage.get('Cart')
        .then((data) => {
          let cart: Cart = data;
          this.http.post(this.URL, cart )
          .toPromise()
          .then(() => console.log('deu certo'))
          .catch((err) => console.log('Erro: ', err));
        });
    });
  }//end public postCheckout()

}
