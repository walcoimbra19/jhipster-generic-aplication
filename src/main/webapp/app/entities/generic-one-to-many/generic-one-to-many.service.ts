import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IGenericOneToMany } from 'app/shared/model/generic-one-to-many.model';

type EntityResponseType = HttpResponse<IGenericOneToMany>;
type EntityArrayResponseType = HttpResponse<IGenericOneToMany[]>;

@Injectable({ providedIn: 'root' })
export class GenericOneToManyService {
  public resourceUrl = SERVER_API_URL + 'api/generic-one-to-manies';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/generic-one-to-manies';

  constructor(protected http: HttpClient) {}

  create(genericOneToMany: IGenericOneToMany): Observable<EntityResponseType> {
    return this.http.post<IGenericOneToMany>(this.resourceUrl, genericOneToMany, { observe: 'response' });
  }

  update(genericOneToMany: IGenericOneToMany): Observable<EntityResponseType> {
    return this.http.put<IGenericOneToMany>(this.resourceUrl, genericOneToMany, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGenericOneToMany>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenericOneToMany[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenericOneToMany[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
