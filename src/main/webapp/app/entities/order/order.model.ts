import * as dayjs from 'dayjs';
import { IClient } from 'app/entities/client/client.model';
import { IOrderLine } from 'app/entities/order-line/order-line.model';

export interface IOrder {
  id?: number;
  totalPrice?: number | null;
  datePurchase?: dayjs.Dayjs | null;
  bill?: boolean | null;
  client?: IClient | null;
  orderLines?: IOrderLine[] | null;
}

export class Order implements IOrder {
  constructor(
    public id?: number,
    public totalPrice?: number | null,
    public datePurchase?: dayjs.Dayjs | null,
    public bill?: boolean | null,
    public client?: IClient | null,
    public orderLines?: IOrderLine[] | null
  ) {
    this.bill = this.bill ?? false;
  }
}

export function getOrderIdentifier(order: IOrder): number | undefined {
  return order.id;
}
