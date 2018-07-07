import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../app/models/credenciais.dto';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  }

  constructor(public navCtrl: NavController, public menu: MenuController) { //injecao de dependencia ionic/angular apenas passar como parametro do construtor

  }


  /*desabilitar menu na tela de login*/ dddd
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  /*habilitar menu em ouras páginas*/
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  login(){
    console.log(this.creds);
    this.navCtrl.setRoot("CategoriasPage")
  }



}
