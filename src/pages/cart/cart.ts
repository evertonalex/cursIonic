import { CartService } from './../../app/services/domain/cart.service';
import { API_CONFIG } from './../../app/config/api.config';
import { ProdutoService } from './../../app/services/domain/produto.service';
import { CartItem } from './../../app/models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../app/models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cartservice: CartService,
    public produtoService:ProdutoService) {
  }

  ionViewDidLoad() {
    let cart = this.cartservice.getCart();
    this.items = cart.items;
    this.loadImageUrls();
  }
  
  loadImageUrls(){
    for(var i=0; i< this.items.length;i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.produto.id).subscribe(response =>{
        item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;
      },
      error=>{});
    }
  }

  removeItem(produto: ProdutoDTO){
    this.items = this.cartservice.removeProduto(produto).items;
  }
  icreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartservice.increaseQuantity(produto).items;
  }
  decreaseQuantity(produto: ProdutoDTO){
    this.items = this.cartservice.decreaseQuantity(produto).items;
  }
  total() : number{
    return this.cartservice.total();
  }

  goOn(){
    this.navCtrl.setRoot('CategoriasPage');
  }
  chekout(){
    this.navCtrl.push('PickAddressPage');
  }

}
