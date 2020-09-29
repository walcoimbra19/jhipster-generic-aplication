import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGenericHistory, GenericHistory } from 'app/shared/model/generic-history.model';
import { GenericHistoryService } from './generic-history.service';
import { GenericHistoryComponent } from './generic-history.component';
import { GenericHistoryDetailComponent } from './generic-history-detail.component';
import { GenericHistoryUpdateComponent } from './generic-history-update.component';

@Injectable({ providedIn: 'root' })
export class GenericHistoryResolve implements Resolve<IGenericHistory> {
  constructor(private service: GenericHistoryService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGenericHistory> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((genericHistory: HttpResponse<GenericHistory>) => {
          if (genericHistory.body) {
            return of(genericHistory.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GenericHistory());
  }
}

export const genericHistoryRoute: Routes = [
  {
    path: '',
    component: GenericHistoryComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenericHistoryDetailComponent,
    resolve: {
      genericHistory: GenericHistoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenericHistoryUpdateComponent,
    resolve: {
      genericHistory: GenericHistoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenericHistoryUpdateComponent,
    resolve: {
      genericHistory: GenericHistoryResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericHistory.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
