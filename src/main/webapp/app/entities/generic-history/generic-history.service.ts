import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption, Search } from 'app/shared/util/request-util';
import { IGenericHistory } from 'app/shared/model/generic-history.model';

type EntityResponseType = HttpResponse<IGenericHistory>;
type EntityArrayResponseType = HttpResponse<IGenericHistory[]>;

@Injectable({ providedIn: 'root' })
export class GenericHistoryService {
  public resourceUrl = SERVER_API_URL + 'api/generic-histories';
  public resourceSearchUrl = SERVER_API_URL + 'api/_search/generic-histories';

  constructor(protected http: HttpClient) {}

  create(genericHistory: IGenericHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(genericHistory);
    return this.http
      .post<IGenericHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(genericHistory: IGenericHistory): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(genericHistory);
    return this.http
      .put<IGenericHistory>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IGenericHistory>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGenericHistory[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  search(req: Search): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IGenericHistory[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  protected convertDateFromClient(genericHistory: IGenericHistory): IGenericHistory {
    const copy: IGenericHistory = Object.assign({}, genericHistory, {
      startDate: genericHistory.startDate && genericHistory.startDate.isValid() ? genericHistory.startDate.toJSON() : undefined,
      endDate: genericHistory.endDate && genericHistory.endDate.isValid() ? genericHistory.endDate.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.startDate = res.body.startDate ? moment(res.body.startDate) : undefined;
      res.body.endDate = res.body.endDate ? moment(res.body.endDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((genericHistory: IGenericHistory) => {
        genericHistory.startDate = genericHistory.startDate ? moment(genericHistory.startDate) : undefined;
        genericHistory.endDate = genericHistory.endDate ? moment(genericHistory.endDate) : undefined;
      });
    }
    return res;
  }
}
