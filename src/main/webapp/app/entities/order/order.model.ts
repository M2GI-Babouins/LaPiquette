import * as dayjs from 'dayjs';
import { IClient } from 'app/entities/client/client.model';
import { IOrderLine } from 'app/entities/order-line/order-line.model';

export interface IOrder {
  id: number;
  orderLines: IOrderLine[];
  totalPrice: number;
  datePurchase?: dayjs.Dayjs | null;
  basket?: boolean | null;
  client?: IClient | null;
}

export class Order implements IOrder {
  constructor(
    public id: number = -1,
    public orderLines: IOrderLine[] = [],
    public totalPrice: number = 0,
    public datePurchase?: dayjs.Dayjs | null,
    public basket?: boolean | null,
    public client?: IClient | null
  ) {
    this.basket = this.basket ?? false;
  }
}

export function getOrderIdentifier(order: IOrder): number | undefined {
  return order.id;
}
