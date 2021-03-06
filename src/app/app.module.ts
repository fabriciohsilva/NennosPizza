import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { DrinksPage } from '../pages/drinks/drinks';
import { NennosPizza } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShoppingCartPage } from '../pages/shopping-cart/shopping-cart';
import { ModalSuccess } from '../modals/modal-success/modal-success';

import { DrinkProvider } from '../providers/drink/drink.provider';
import { IngredientProvider } from '../providers/ingredient/ingredient.provider';
import { PizzaProvider } from '../providers/pizza/pizza.provider';
import { ShoppingCartProvider } from '../providers/shopping-cart/shopping-cart.provider';


@NgModule({
  declarations: [
    DrinksPage,
    ModalSuccess,
    NennosPizza,
    HomePage,
    ShoppingCartPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(NennosPizza,{
      mode: 'ios',
      backButtonText: ''
    }),
    IonicStorageModule.forRoot({
      name: 'fabriciohsilva',
      storeName: 'nennospizza',
      driverOrder: ['indexeddb', 'sqlite','localstorage', 'websql']
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    DrinksPage,
    ModalSuccess,
    NennosPizza,
    HomePage,
    ShoppingCartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PizzaProvider,
    DrinkProvider,
    IngredientProvider,
    ShoppingCartProvider
  ]
})
export class AppModule {}
