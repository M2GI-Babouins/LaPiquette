import { IProduct } from 'app/entities/product/product.model';
import { IOrder } from 'app/entities/order/order.model';

export interface IOrderLine {
  id?: number;
  quantity?: number;
  product?: IProduct;
  order?: IOrder;
  unityPrice?: number;
}

export class OrderLine implements IOrderLine {
  constructor(public id?: number, public quantity?: number, public unityPrice?: number, public product?: IProduct, public order?: IOrder) {}
}
