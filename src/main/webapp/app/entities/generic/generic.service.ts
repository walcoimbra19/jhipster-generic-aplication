import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IGeneric } from 'app/shared/model/generic.model';

type EntityResponseType = HttpResponse<IGeneric>;
type EntityArrayResponseType = HttpResponse<IGeneric[]>;

@Injectable({ providedIn: 'root' })
export class GenericService {
  public resourceUrl = SERVER_API_URL + 'api/generics';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/generics';

  constructor(protected http: HttpClient) {}

  create(generic: IGeneric): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(generic);
    return this.http
      .post<IGeneric>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(generic: IGeneric): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(generic);
    return this.http
      .put<IGeneric>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGeneric>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGeneric[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGeneric[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(generic: IGeneric): IGeneric {
    const copy: IGeneric = Object.assign({}, generic, {
      fieldLocalDate: generic.fieldLocalDate && generic.fieldLocalDate.isValid() ? generic.fieldLocalDate.format(DATE_FORMAT) : undefined,
      fieldZonedDateTime:
        generic.fieldZonedDateTime && generic.fieldZonedDateTime.isValid() ? generic.fieldZonedDateTime.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fieldLocalDate = res.body.fieldLocalDate ? moment(res.body.fieldLocalDate) : undefined;
      res.body.fieldZonedDateTime = res.body.fieldZonedDateTime ? moment(res.body.fieldZonedDateTime) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((generic: IGeneric) => {
        generic.fieldLocalDate = generic.fieldLocalDate ? moment(generic.fieldLocalDate) : undefined;
        generic.fieldZonedDateTime = generic.fieldZonedDateTime ? moment(generic.fieldZonedDateTime) : undefined;
      });
    }
    return res;
  }
}
