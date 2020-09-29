import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IGeneric, Generic } from 'app/shared/model/generic.model';
import { GenericService } from './generic.service';
import { GenericComponent } from './generic.component';
import { GenericDetailComponent } from './generic-detail.component';
import { GenericUpdateComponent } from './generic-update.component';

@Injectable({ providedIn: 'root' })
export class GenericResolve implements Resolve<IGeneric> {
  constructor(private service: GenericService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IGeneric> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((generic: HttpResponse<Generic>) => {
          if (generic.body) {
            return of(generic.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Generic());
  }
}

export const genericRoute: Routes = [
  {
    path: '',
    component: GenericComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.generic.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GenericDetailComponent,
    resolve: {
      generic: GenericResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.generic.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GenericUpdateComponent,
    resolve: {
      generic: GenericResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.generic.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GenericUpdateComponent,
    resolve: {
      generic: GenericResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'jhipsterGenericAplicationApp.generic.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
