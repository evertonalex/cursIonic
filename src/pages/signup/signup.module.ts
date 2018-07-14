import { EstadoService } from './../../app/services/domain/estado.service';
import { CidadeService } from './../../app/services/domain/cidade.service';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage } from './signup';

@NgModule({
  declarations: [
    SignupPage,
  ],
  imports: [
    IonicPageModule.forChild(SignupPage),
  ],
  providers:[
    CidadeService,
    EstadoService
  ]
})
export class SignupPageModule {}
