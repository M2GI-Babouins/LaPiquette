import { IOrder } from 'app/entities/order/order.model';

export interface IClient {
  id: number;
  orders: IOrder[];
  email?: string | null;
  password?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  adress?: string | null;
  loggedIn?: boolean | null;
}

export class Client implements IClient {
  constructor(
    public id: number = -1,
    public orders: IOrder[] = [],
    public email?: string | null,
    public password?: string | null,
    public firstName?: string | null,
    public lastName?: string | null,
    public adress?: string | null,
    public loggedIn?: boolean | null
  ) {
    this.loggedIn = this.loggedIn ?? false;
  }
}

export function getClientIdentifier(client: IClient): number | undefined {
  return client.id;
}
