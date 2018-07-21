import { ItemPedidoDTO } from './item-pedido.dto';
import { pagamentoDTO } from './pagamento.dto';
import { RefDTO } from "./ref.dto";

export interface PedidoDTO{
    cliente: RefDTO;
    enderecoDeEntrega: RefDTO;
    pagamento: pagamentoDTO;
    itens: ItemPedidoDTO[];
}