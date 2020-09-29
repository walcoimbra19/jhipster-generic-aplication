import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGenericOneToMany, GenericOneToMany } from 'app/shared/model/generic-one-to-many.model';
import { GenericOneToManyService } from './generic-one-to-many.service';
import { GenericOneToManyComponent } from './generic-one-to-many.component';
import { GenericOneToManyDetailComponent } from './generic-one-to-many-detail.component';
import { GenericOneToManyUpdateComponent } from './generic-one-to-many-update.component';

@Injectable({ providedIn: 'root' })
export class GenericOneToManyResolve implements Resolve<IGenericOneToMany> {
  constructor(private service: GenericOneToManyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGenericOneToMany> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((genericOneToMany: HttpResponse<GenericOneToMany>) => {
          if (genericOneToMany.body) {
            return of(genericOneToMany.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GenericOneToMany());
  }
}

export const genericOneToManyRoute: Routes = [
  {
    path: '',
    component: GenericOneToManyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericOneToMany.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenericOneToManyDetailComponent,
    resolve: {
      genericOneToMany: GenericOneToManyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericOneToMany.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenericOneToManyUpdateComponent,
    resolve: {
      genericOneToMany: GenericOneToManyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericOneToMany.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenericOneToManyUpdateComponent,
    resolve: {
      genericOneToMany: GenericOneToManyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericOneToMany.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
