import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import { Drink } from '../../interfaces/drink.interface';

import 'rxjs/add/operator/map';

@Injectable()
export class DrinkProvider {

  public isConnected: boolean = true;
  private URL: string = 'https://api.myjson.com/bins/150da7';

  constructor(
    public http: Http,
    private storage: Storage) {
  }//end constructor


  public getDrinksMenuFromDB() {
    return new Promise(resolve =>{
      this.storage.ready()
        .then(() => {
          this.storage.get('Drinks')
          .then((data) => {
            if (data === null) {
              resolve(this.saveDrinkMenuOnDB());
            }
            else{
              resolve(data);
            }
          });
        });
    });
  }//end public getDrinkFromDB()


  public saveDrinkMenuOnDB() {
    return new Promise(resolve =>{      
      this.getDrinks().then(data => {
        this.storage.set('Drinks', data);      
        resolve(data);
      });      
    });       
  }//end public getDrinkFromDB()


  public getDrinks() {
    return new Promise(resolve => {
      this.http.get(this.URL)
        .map(res => res.json())
        .subscribe(data => {
          resolve( data);
      });
    });//end this.http.get(this.URL)    
  }//public getDrinks()

}
