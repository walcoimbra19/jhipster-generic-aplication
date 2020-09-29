import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IGenericManyToOne } from 'app/shared/model/generic-many-to-one.model';

type EntityResponseType = HttpResponse<IGenericManyToOne>;
type EntityArrayResponseType = HttpResponse<IGenericManyToOne[]>;

@Injectable({ providedIn: 'root' })
export class GenericManyToOneService {
  public resourceUrl = SERVER_API_URL + 'api/generic-many-to-ones';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/generic-many-to-ones';

  constructor(protected http: HttpClient) {}

  create(genericManyToOne: IGenericManyToOne): Observable<EntityResponseType> {
    return this.http.post<IGenericManyToOne>(this.resourceUrl, genericManyToOne, { observe: 'response' });
  }

  update(genericManyToOne: IGenericManyToOne): Observable<EntityResponseType> {
    return this.http.put<IGenericManyToOne>(this.resourceUrl, genericManyToOne, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGenericManyToOne>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenericManyToOne[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenericManyToOne[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
