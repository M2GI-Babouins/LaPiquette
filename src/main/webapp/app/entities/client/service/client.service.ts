import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IClient, getClientIdentifier } from '../client.model';
import { OrderService } from './../../order/service/order.service';

export type EntityResponseType = HttpResponse<IClient>;
export type EntityArrayResponseType = HttpResponse<IClient[]>;

@Injectable({ providedIn: 'root' })
export class ClientService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/clients');

  protected client: IClient | null = null;

  constructor(
    protected http: HttpClient,
    protected applicationConfigService: ApplicationConfigService,
    protected orderService: OrderService
  ) {}

  logClient(email: string | null): void {
    // eslint-disable-next-line no-console
    console.log(email);
    if (email == null) {
      this.client = null;
      return;
    }

    this.http
      .get<IClient>(`${this.resourceUrl}/getbyemail/${email}`, { observe: 'response' })
      .subscribe(reponse => this.authenticateClient(reponse.body));
  }

  authenticateClient(client: IClient | null): void {
    // eslint-disable-next-line no-console
    console.log(client);

    if (client == null) {
      // TODO si le client n'est pas trouvé
      return;
    }

    this.client = client;
    this.orderService.setClient(this.client);
  }

  create(client: IClient): Observable<EntityResponseType> {
    return this.http.post<IClient>(this.resourceUrl, client, { observe: 'response' });
  }

  update(client: IClient): Observable<EntityResponseType> {
    return this.http.put<IClient>(`${this.resourceUrl}/${getClientIdentifier(client) as number}`, client, { observe: 'response' });
  }

  partialUpdate(client: IClient): Observable<EntityResponseType> {
    return this.http.patch<IClient>(`${this.resourceUrl}/${getClientIdentifier(client) as number}`, client, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IClient>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IClient[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addClientToCollectionIfMissing(clientCollection: IClient[], ...clientsToCheck: (IClient | null | undefined)[]): IClient[] {
    const clients: IClient[] = clientsToCheck.filter(isPresent);
    if (clients.length > 0) {
      const clientCollectionIdentifiers = clientCollection.map(clientItem => getClientIdentifier(clientItem)!);
      const clientsToAdd = clients.filter(clientItem => {
        const clientIdentifier = getClientIdentifier(clientItem);
        if (clientIdentifier == null || clientCollectionIdentifiers.includes(clientIdentifier)) {
          return false;
        }
        clientCollectionIdentifiers.push(clientIdentifier);
        return true;
      });
      return [...clientsToAdd, ...clientCollection];
    }
    return clientCollection;
  }
}
