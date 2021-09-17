import { IProduct } from 'app/entities/product/product.model';
import { IOrder } from 'app/entities/order/order.model';

export interface IOrderLine {
  product: IProduct;
  quantity: number;
  unityPrice: number;
  order?: IOrder | null;
  id?: number | null;
  totalPrice?: number;
}

export class OrderLine implements IOrderLine {
  constructor(
    public product: IProduct,
    public quantity: number = 1,
    public unityPrice: number = 0,
    public id?: number | null,
    public order?: IOrder | null
  ) {}
}
