import { ProdutoService } from './../../app/services/domain/produto.service';
import { ProdutoDTO } from './../../app/models/produto.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../app/config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id).subscribe(response=>{
      this.items = response['content'];
      this.loadImageUrls();
    },
    error=>{});
  };

  loadImageUrls(){
    for(var i=0; i< this.items.length;i++){
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id).subscribe(response =>{
        item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
      },
      error=>{});
    }
  }

}
