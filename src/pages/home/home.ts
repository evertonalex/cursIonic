import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) { //injecao de dependencia ionic/angular apenas passar como parametro do construtor

  }

  login(){
    this.navCtrl.setRoot("CategoriasPage")
  }

}
