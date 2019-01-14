import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { AppConfig } from '../../app/app.config';

@Injectable()
export class IngredientProvider {

  public isConnected: boolean = true;

  constructor(
    public http: Http,
    private storage: Storage) {
  }//end constructor


  public getIngredientsListFromDB() {
    return new Promise(resolve =>{
      this.storage.ready()
        .then(() => {
          this.storage.get('Ingredients')
          .then((data) => {
            if (data === null) {
              resolve(this.saveIngredientListOnDB());
            }
            else {
              resolve(data);
            }
          });
        });
    });
  }//end public getIngredientFromDB()

  public saveIngredientListOnDB() {
    return new Promise(resolve =>{      
      this.getIngredients().then(data => {
        this.storage.set('Ingredients', data);      
        resolve(data);
      });      
    });
  }//end public saveIngredientListOnDB()

  public getIngredients() {
    return new Promise(resolve => {
      this.http.get(AppConfig.URLINGREDIENTS)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
      });
    });//end this.http.get(this.URL)    
  }//public getIngredients()



}
