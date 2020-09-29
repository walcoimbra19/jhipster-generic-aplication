import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGenericManyToOne, GenericManyToOne } from 'app/shared/model/generic-many-to-one.model';
import { GenericManyToOneService } from './generic-many-to-one.service';
import { GenericManyToOneComponent } from './generic-many-to-one.component';
import { GenericManyToOneDetailComponent } from './generic-many-to-one-detail.component';
import { GenericManyToOneUpdateComponent } from './generic-many-to-one-update.component';

@Injectable({ providedIn: 'root' })
export class GenericManyToOneResolve implements Resolve<IGenericManyToOne> {
  constructor(private service: GenericManyToOneService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGenericManyToOne> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((genericManyToOne: HttpResponse<GenericManyToOne>) => {
          if (genericManyToOne.body) {
            return of(genericManyToOne.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new GenericManyToOne());
  }
}

export const genericManyToOneRoute: Routes = [
  {
    path: '',
    component: GenericManyToOneComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericManyToOne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenericManyToOneDetailComponent,
    resolve: {
      genericManyToOne: GenericManyToOneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericManyToOne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenericManyToOneUpdateComponent,
    resolve: {
      genericManyToOne: GenericManyToOneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericManyToOne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenericManyToOneUpdateComponent,
    resolve: {
      genericManyToOne: GenericManyToOneResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.genericManyToOne.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
