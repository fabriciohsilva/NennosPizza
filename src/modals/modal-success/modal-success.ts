import { Component } from '@angular/core';
import { ViewController, ModalController, NavController } from 'ionic-angular';

@Component({
  selector: 'modal-success',
  templateUrl: 'modal-success.html',
})
export class ModalSuccess {

constructor(
  public viewCtrl: ViewController,
  public modalCtrl: ModalController,        
  public navCtrl: NavController) {}

  public dismiss(): void {
    this.viewCtrl.dismiss();        
  }//end public dismiss(): void
}