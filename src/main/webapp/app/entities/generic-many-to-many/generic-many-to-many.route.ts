import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGenericManyToMany, GenericManyToMany } from 'app/shared/model/generic-many-to-many.model';
import { GenericManyToManyService } from './generic-many-to-many.service';
import { GenericManyToManyComponent } from './generic-many-to-many.component';
import { GenericManyToManyDetailComponent } from './generic-many-to-many-detail.component';
import { GenericManyToManyUpdateComponent } from './generic-many-to-many-update.component';

@Injectable({ providedIn: 'root' })
export class GenericManyToManyResolve implements Resolve<IGenericManyToMany> {
  constructor(private service: GenericManyToManyService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGenericManyToMany> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((genericManyToMany: HttpResponse<GenericManyToMany>) => {
          if (genericManyToMany.body) {
            return of(genericManyToMany.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GenericManyToMany());
  }
}

export const genericManyToManyRoute: Routes = [
  {
    path: '',
    component: GenericManyToManyComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericManyToMany.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenericManyToManyDetailComponent,
    resolve: {
      genericManyToMany: GenericManyToManyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericManyToMany.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenericManyToManyUpdateComponent,
    resolve: {
      genericManyToMany: GenericManyToManyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericManyToMany.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenericManyToManyUpdateComponent,
    resolve: {
      genericManyToMany: GenericManyToManyResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericManyToMany.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
