import { CidadeDTO } from './../../app/models/cidade.dto';
import { EstadoDTO } from './../../app/models/estado.dto';
import { EstadoService } from './../../app/services/domain/estado.service';
import { CidadeService } from './../../app/services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClienteService } from '../../app/services/domain/cliente.service';
import { AlertController } from '../../../node_modules/ionic-angular/components/alert/alert-controller';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public cidadeService: CidadeService,
    public estadoService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl: AlertController) {

      this.formGroup = this.formBuilder.group({//responsável por instanciar um form group
        nome:['nome', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
        email: ['', [Validators.required, Validators.email]],
        tipo : ['1', [Validators.required]],
        cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
        senha: ['', Validators.required],
        logradouro: ['', [Validators.required]],
        numero: ['', Validators.required],
        complemento: ['', []],
        bairro: ['', []],
        cep:['', [Validators.required]],
        telefone1 : ['', [Validators.required]],
        telefone2 : ['',[]],
        telefone3 : ['',[]],
        estadoId : [null, [Validators.required]],
        cidadeID : [null,[Validators.required]]
      });
  }

  ionViewDidLoad(){
    this.estadoService.findAll().subscribe(response=>{
      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    },
    error => {})
  }
  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadeService.findAll(estado_id).subscribe(
      response=>{
        this.cidades = response;
        this.formGroup.controls.cidadeID.setValue(null);
      },
      error => {}
    )
  }

  signupUser(){
    console.log("enviou o form");
    console.log(this.formGroup.value);
    this.clienteService.insert(this.formGroup.value).subscribe(reponse=>{
      this.showInsertOk();
    },
    error=>{})
  }
  showInsertOk(){
    let alert = this.alertCtrl.create({
      title: "Sucesso!",
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'Ok',
          handler:()=>{
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }



}
