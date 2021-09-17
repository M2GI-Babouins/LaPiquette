import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs';

import { isPresent } from 'app/core/util/operators';
import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IOrder, getOrderIdentifier } from '../order.model';
import { IOrderLine } from './../../order-line/order-line.model';
import { IProduct } from './../../product/product.model';
import { ClientService } from './../../client/service/client.service';

export type EntityResponseType = HttpResponse<IOrder>;
export type EntityArrayResponseType = HttpResponse<IOrder[]>;

@Injectable({ providedIn: 'root' })
export class OrderService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/orders');

  protected basket: IOrder = { id: 0, orderLines: [], totalPrice: 0, basket: true };

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected clientService: ClientService
  ) {
    this.findBasket();
  }

  // #region Basket
  getBasket(): IOrder {
    return this.basket;
  }

  addToBasket(product: IProduct, quantity: number): void {
    let orderline = this.basket.orderLines.find(ol => ol.product.id === product.id);
    if (orderline != null) {
      orderline.quantity += quantity;
    } else {
      orderline = { product, quantity, unityPrice: product.price! };
      this.basket.orderLines.push(orderline);
    }

    this.calculateTotal();
    this.updateBasket();
  }

  changeBasketQuantity(orderLine: IOrderLine, quantity: number): void {
    orderLine.quantity = quantity;
    this.calculateTotal();
    this.updateBasket();
  }

  deleteFromBasket(orderLine: IOrderLine): void {
    this.basket.orderLines.splice(this.basket.orderLines.findIndex(ol => ol === orderLine));
    this.calculateTotal();
    this.updateBasket();
  }

  deleteAllBasket(): void {
    this.basket.orderLines = [];
    this.calculateTotal();
    this.updateBasket();
  }

  calculateTotal(): void {
    this.basket.totalPrice = 0;

    this.basket.orderLines.forEach(ol => {
      this.basket.totalPrice += ol.unityPrice * ol.quantity;
    });
  }

  setOrderDate(): void {
    this.basket.datePurchase = dayjs();
  }

  updateBasket(): void {
    if (this.notClient()) {
      return;
    }

    const copy = this.convertDateFromClient(this.basket);
    this.http
      .put<IOrder>(`${this.resourceUrl}/basket`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
      // eslint-disable-next-line no-console
      .subscribe(data => console.log(data));
  }

  findBasket(): void {
    if (this.notClient()) {
      return;
    }
    const clientid = this.clientService.getClient()!.id;

    this.http
      .get<IOrder>(`${this.resourceUrl}/${clientid}/basket`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)))
      .subscribe(data => {
        // eslint-disable-next-line no-console
        console.log(data);
        if (data.body) {
          this.basket.id = data.body.id;
          this.basket.datePurchase = data.body.datePurchase;
          this.basket.totalPrice = data.body.totalPrice;
          this.basket.orderLines = data.body.orderLines;
        }
      });
  }

  notClient(): boolean {
    return this.clientService.getClient() == null;
  }
  // #endregion Basket

  create(order: IOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .post<IOrder>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(order: IOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .put<IOrder>(`${this.resourceUrl}/${getOrderIdentifier(order) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  partialUpdate(order: IOrder): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(order);
    return this.http
      .patch<IOrder>(`${this.resourceUrl}/${getOrderIdentifier(order) as number}`, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IOrder>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IOrder[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addOrderToCollectionIfMissing(orderCollection: IOrder[], ...ordersToCheck: (IOrder | null | undefined)[]): IOrder[] {
    const orders: IOrder[] = ordersToCheck.filter(isPresent);
    if (orders.length > 0) {
      const orderCollectionIdentifiers = orderCollection.map(orderItem => getOrderIdentifier(orderItem)!);
      const ordersToAdd = orders.filter(orderItem => {
        const orderIdentifier = getOrderIdentifier(orderItem);
        if (orderIdentifier == null || orderCollectionIdentifiers.includes(orderIdentifier)) {
          return false;
        }
        orderCollectionIdentifiers.push(orderIdentifier);
        return true;
      });
      return [...ordersToAdd, ...orderCollection];
    }
    return orderCollection;
  }

  protected convertDateFromClient(order: IOrder): IOrder {
    return Object.assign({}, order, {
      datePurchase: order.datePurchase?.isValid() ? order.datePurchase.format(DATE_FORMAT) : undefined,
    });
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datePurchase = res.body.datePurchase ? dayjs(res.body.datePurchase) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((order: IOrder) => {
        order.datePurchase = order.datePurchase ? dayjs(order.datePurchase) : undefined;
      });
    }
    return res;
  }
}
