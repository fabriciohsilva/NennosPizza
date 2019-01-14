import { Component } from '@angular/core';
import { Response,  } from '@angular/http';

import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { DrinksPage } from '../drinks/drinks';

import { ShoppingCartProvider } from '../../providers/shopping-cart/shopping-cart.provider';

import { CartItem } from '../../interfaces/cart.interface';
import { ModalSuccess } from '../../modals/modal-success/modal-success';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-shopping-cart',
  templateUrl: 'shopping-cart.html',
})
export class ShoppingCartPage {

  public cart: Array<CartItem> = [];
  public totalCart: number = 0;


  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private shoppingCartProvider: ShoppingCartProvider) {
  }


  ionViewWillEnter() {
    this.shoppingCartProvider.getCartFromDB()
      .then((data: Array<CartItem>) => {
        this.cart = data;
        this.totalCart = this.cart.reduce( (total, item) => {
          return total = total + item.item.price;
        }, 0);
      });  
  }//end ionViewDidLoad()


  public openDrinks(): void {
    this.navCtrl.push(DrinksPage, {});
  }

  public removeItem(item): void {
    let index = this.cart.indexOf(item);

    if(index > -1)
      this.cart.splice(index, 1);

    this.shoppingCartProvider.saveCartOnDB(this.cart);
    
    this.totalCart = this.cart.reduce( (total, item) => {
      return total = total + item.item.price;
    }, 0);
  }

  public checkout(): void {
    this.shoppingCartProvider.postCheckout()
    .then((response: Response ) => {
      if (response.status === 200) {
        let modal = this.modalCtrl.create(ModalSuccess);
        modal.present();
        modal.onDidDismiss(() => {        
          this.navCtrl.setRoot(HomePage);
        });//end modal.onDidDismiss(() =>
      }//end if (response.status === 200)
    })
    .catch(() => {
      let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: `Something get's wrong. Try again later.`,
        buttons: ['Ok']
      });
      alert.present();
    });//end this.shoppingCartProvider.postCheckout()
  }//end public checkout(): void

}
