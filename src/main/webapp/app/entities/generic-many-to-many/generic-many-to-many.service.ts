import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IGenericManyToMany } from 'app/shared/model/generic-many-to-many.model';

type EntityResponseType = HttpResponse<IGenericManyToMany>;
type EntityArrayResponseType = HttpResponse<IGenericManyToMany[]>;

@Injectable({ providedIn: 'root' })
export class GenericManyToManyService {
  public resourceUrl = SERVER_API_URL + 'api/generic-many-to-manies';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/generic-many-to-manies';

  constructor(protected http: HttpClient) {}

  create(genericManyToMany: IGenericManyToMany): Observable<EntityResponseType> {
    return this.http.post<IGenericManyToMany>(this.resourceUrl, genericManyToMany, { observe: 'response' });
  }

  update(genericManyToMany: IGenericManyToMany): Observable<EntityResponseType> {
    return this.http.put<IGenericManyToMany>(this.resourceUrl, genericManyToMany, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IGenericManyToMany>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenericManyToMany[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IGenericManyToMany[]>(this.resourceSearchUrl, { params: options, observe: 'response' });
  }
}
