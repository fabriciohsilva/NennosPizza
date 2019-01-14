import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import 'rxjs/add/operator/map';
import { AppConfig } from '../../app/app.config';

@Injectable()
export class DrinkProvider {

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
      this.http.get(AppConfig.URLDRINKS)
        .map(res => res.json())
        .subscribe(data => {
          resolve( data);
      });
    });//end this.http.get(this.URL)    
  }//public getDrinks()

}
