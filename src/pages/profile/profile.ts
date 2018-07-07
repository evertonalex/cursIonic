import { API_CONFIG } from './../../app/config/api.config';
import { ClienteService } from './../../app/services/domain/cliente.service';
import { StorageService } from './../../app/services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../app/models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public ClienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    console.log("ionViewDidLoad - Profile")
    if(localUser && localUser.email){
      this.ClienteService.findByEmail(localUser.email).subscribe(response=>{
        this.cliente = response;
        //buscar imagem
      },
      error=>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists(){
    this.ClienteService.getImageFromBucket(this.cliente.id).subscribe(response=>{
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    },
    error=>{});
  }

}
