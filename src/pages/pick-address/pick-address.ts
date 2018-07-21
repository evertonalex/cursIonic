import { CartService } from './../../app/services/domain/cart.service';
import { PedidoDTO } from './../../app/models/pedido.dto';
import { ClienteService } from './../../app/services/domain/cliente.service';
import { EnderecoDTO } from './../../app/models/endereco.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../app/services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    /*this.items = [ 
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Casa",
        bairro: "Santa Mônica",
        cep: "48293822",
        cidade:{
          id: "1",
          nome: "Uberlandia",
          estado:{
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
    ]*/
    let localUser = this.storage.getLocalUser();
    console.log("ionViewDidLoad - pickAddress")
    if(localUser && localUser.email){
      this.clienteService.findByEmail(localUser.email)
        .subscribe(response=>{

        let cart = this.cartService.getCart();

        this.items = response['enderecos'];
        this.pedido = {
          cliente: {id: response['id']},
          enderecoDeEntrega: null,
          pagamento: null,
          itens: cart.items.map(x=>{return {quantidade:x.quantidade, produto: {id:x.produto.id}}})
        }
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

  nextPage(item: EnderecoDTO){
    this.pedido.enderecoDeEntrega = {id: item.id};
    this.navCtrl.push('PaymentPage', {pedido: this.pedido});
  }

}
