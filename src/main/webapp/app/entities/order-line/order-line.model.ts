import { IProduct } from 'app/entities/product/product.model';
import { IOrder } from 'app/entities/order/order.model';

export interface IOrderLine {
  id?: number | null;
  quantity?: number | null;
  unityPrice?: number | null;
  product?: IProduct | null;
  order?: IOrder | null;
}

export class OrderLine implements IOrderLine {
  constructor(
    public id?: number | null,
    public quantity?: number | null,
    public unityPrice?: number | null,
    public product?: IProduct | null,
    public order?: IOrder | null
  ) {}
}
