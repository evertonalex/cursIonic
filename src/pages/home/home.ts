import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../app/models/credenciais.dto';
import { AuthService } from '../../app/services/auth.service';

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

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService
  ) { //injecao de dependencia ionic/angular apenas passar como parametro do construtor

  }


  /*desabilitar menu na tela de login*/ dddd
  ionViewWillEnter(){
    this.menu.swipeEnable(false);
  }

  /*habilitar menu em ouras páginas*/
  ionViewDidLeave(){
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter(){
    this.auth.refreshToken().subscribe(response=>{
      this.auth.sucessfullLogin(response.headers.get('Authorization'));
      console.log(response.headers.get('Authorization'));
      this.navCtrl.setRoot("CategoriasPage")
    },
    error =>{});
  }

  login(){
    console.log(this.creds);
    this.auth.authenticate(this.creds).subscribe(response=>{
      this.auth.sucessfullLogin(response.headers.get('Authorization'));
      console.log(response.headers.get('Authorization'));
      this.navCtrl.setRoot("CategoriasPage")
    },
    error =>{});
  }

  signup(){
    console.log("signUP --- ");
    this.navCtrl.push('SignupPage');
  }



}
