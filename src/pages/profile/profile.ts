import { API_CONFIG } from './../../app/config/api.config';
import { ClienteService } from './../../app/services/domain/cliente.service';
import { StorageService } from './../../app/services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteDTO } from '../../app/models/cliente.dto';
import { CameraOptions } from '../../../node_modules/@ionic-native/camera';
import { Camera } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;
  picture: string;
  cameraOn: boolean = false;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public ClienteService: ClienteService,
    public camera: Camera) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    console.log("ionViewDidLoad - Profile")
    if(localUser && localUser.email){
      this.ClienteService.findByEmail(localUser.email).subscribe(response=>{
        this.cliente = response as ClienteDTO;
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

  getCameraPicture(){
    this.cameraOn = true;
    const options: CameraOptions = {
      quality:100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData)=>{
      let picture = 'data:image/png;base64' + imageData;
      this.cameraOn = false;
    }, (err)=>{

    });
  }

  sendpicture(){
    this.ClienteService.uploadPicture(this.picture)
      .subscribe(response =>{
        this.picture = null;
        this.loadData();
      },
    error=>{

    });
  }

  cancel(){
    this.picture = null;
  }

}
