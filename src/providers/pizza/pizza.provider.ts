import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

    this.isConnected = navigator.onLine;
    setInterval(() => {
      this.isConnected = navigator.onLine;
    }, 300000); //test connection every 5 minutes

  }//end constructor

  public getPizzasMenuFromDB() {
    return new Promise(resolve =>{
      this.storage.ready()
        .then(() => {
          this.storage.get('Pizzas')
          .then((data) => {
            if (data === null) {
              return this.savePizzaMenuOnDB();
            }

            resolve(data);
          });
        });
    });
  }//end public getPizzaFromDB()

  public savePizzaMenuOnDB() {
    return new Promise(resolve =>{
      this.storage.set('Pizzas', this.getPizzas() );
      this.storage.get('Pizzas')
      .then((data) => {
        resolve(data);
      });
    });
        
  }//end public getPizzaFromDB()


  public savePizzaOnDB(pizza: Pizza) {
     this.storage.ready()
      .then(() => {
        this.storage.set('Pizzas', pizza);
      });     
  }//end public setPizzaOnDB()



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
