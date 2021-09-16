import { OrderService } from './../../order/service/order.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IProduct, getProductIdentifier } from '../product.model';
import { OrderLine } from 'app/entities/order-line/order-line.model';

export type EntityResponseType = HttpResponse<IProduct>;
export type EntityArrayResponseType = HttpResponse<IProduct[]>;

@Injectable({ providedIn: 'root' })
export class ProductService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/products');

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected orderService: OrderService
  ) {}

  ajouterPanier(product: IProduct, quantity: number): void {
    let panierLocal = JSON.parse(localStorage.getItem('panier')!);
    if (panierLocal == null) {
      panierLocal = [];
    }
    let found = false;
    panierLocal.forEach((order: OrderLine) => {
      if (order.product.id === product.id) {
        order.quantity += quantity;
        found = true;
      }
    });
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!found) {
      const orderline = { product, quantity, unityPrice: product.price };
      panierLocal.push(orderline);
      // eslint-disable-next-line no-console
      console.log(orderline);
    }
    localStorage.setItem('panier', JSON.stringify(panierLocal));

    this.orderService.addToBasket(product, quantity);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  getPanier() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return JSON.parse(localStorage.getItem('panier')!);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  removePanier() {
    const panier: never[] = [];
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  removeFromPanier(produit: IProduct): void {
    const panier = JSON.parse(localStorage.getItem('panier')!);
    panier.forEach((order: OrderLine) => {
      if (order.product.id === produit.id) {
        panier.splice(panier.indexOf(order), 1);
      }
    });
    localStorage.setItem('panier', JSON.stringify(panier));
  }

  isInCart(produit: IProduct): boolean {
    const panier = JSON.parse(localStorage.getItem('panier')!);
    let found = false;
    panier.forEach((order: OrderLine) => {
      if (order.product.id === produit.id) {
        found = true;
      }
    });
    return found;
  }

  loadAll(): Observable<EntityArrayResponseType> {
    return this.http.get<IProduct[]>(`${this.resourceUrl}`, { observe: 'response' });
  }

  // #region Générés par Jhipster
  create(product: IProduct): Observable<EntityResponseType> {
    return this.http.post<IProduct>(this.resourceUrl, product, { observe: 'response' });
  }

  update(product: IProduct): Observable<EntityResponseType> {
    return this.http.put<IProduct>(`${this.resourceUrl}/${getProductIdentifier(product) as number}`, product, { observe: 'response' });
  }

  partialUpdate(product: IProduct): Observable<EntityResponseType> {
    return this.http.patch<IProduct>(`${this.resourceUrl}/${getProductIdentifier(product) as number}`, product, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProduct>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProduct[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addProductToCollectionIfMissing(productCollection: IProduct[], ...productsToCheck: (IProduct | null | undefined)[]): IProduct[] {
    const products: IProduct[] = productsToCheck.filter(isPresent);
    if (products.length > 0) {
      const productCollectionIdentifiers = productCollection.map(productItem => getProductIdentifier(productItem)!);
      const productsToAdd = products.filter(productItem => {
        const productIdentifier = getProductIdentifier(productItem);
        if (productIdentifier == null || productCollectionIdentifiers.includes(productIdentifier)) {
          return false;
        }
        productCollectionIdentifiers.push(productIdentifier);
        return true;
      });
      return [...productsToAdd, ...productCollection];
    }
    return productCollection;
  }
  // #endregion
}
