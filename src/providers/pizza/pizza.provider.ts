import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Pizza } from '../../interfaces/pizza.interface';

import 'rxjs/add/operator/map';


@Injectable()
export class PizzaProvider {

  public isConnected: boolean = true;
  private URL: string = 'https://api.myjson.com/bins/dokm7';

  constructor(
    public http: Http,
    private storage: Storage) {
  }//end constructor


  public getPizzasMenuFromDB() {
    return new Promise(resolve =>{
      this.storage.ready()
        .then(() => {
          this.storage.get('Pizzas')
          .then((data) => {
            if (data === null) {
              resolve(this.savePizzaMenuOnDB());
            }else {
              resolve(data);
            }
          });
        });
    });
  }//end public getPizzaFromDB()


  public savePizzaMenuOnDB() {
    return new Promise(resolve =>{      
      this.getPizzas().then(data => {
        this.storage.set('Pizzas', data);      
        resolve(data);
      });      
    });
  }//end public getPizzaFromDB()

  public getPizzas() {
    return new Promise(resolve => {
      this.http.get(this.URL)
        .map(res => res.json())
        .subscribe(data => {
          resolve( data.pizzas);
      });
    });//end this.http.get(this.URL)    
  }//public getPizzas()

}//end export class PizzaProvider
