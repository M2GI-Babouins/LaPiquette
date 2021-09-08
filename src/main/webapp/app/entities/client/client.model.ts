import { IOrder } from 'app/entities/order/order.model';

export interface IClient {
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  adress?: string | null;
  loggedIn?: boolean | null;
  password?: string | null;
  orders?: IOrder[] | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public firstName?: string | null,
    public lastName?: string | null,
    public email?: string | null,
    public adress?: string | null,
    public loggedIn?: boolean | null,
    public password?: string | null,
    public orders?: IOrder[] | null
  ) {
    this.loggedIn = this.loggedIn ?? false;
  }
}

export function getClientIdentifier(client: IClient): number | undefined {
  return client.id;
}
