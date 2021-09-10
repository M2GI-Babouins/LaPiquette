import { IProduct } from 'app/entities/product/product.model';
import { IOrder } from 'app/entities/order/order.model';

export interface IOrderLine {
  id?: number;
  quantity?: number;
  unityPrice?: number;
  totalPrice?: number;
  product?: IProduct;
  order?: IOrder;
}

export class OrderLine implements IOrderLine {
  constructor(
    public id?: number,
    public quantity?: number,
    public unityPrice?: number,
    public totalPrice?: number,
    public product?: IProduct,
    public order?: IOrder
  ) {}
}

export function getOrderLineIdentifier(orderLine: IOrderLine): number | undefined {
  return orderLine.id;
}
