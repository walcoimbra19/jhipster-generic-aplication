import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'generic',
        loadChildren: () => import('./generic/generic.module').then(m => m.JhipsterGenericAplicationGenericModule),
      },
      {
        path: 'generic-history',
        loadChildren: () => import('./generic-history/generic-history.module').then(m => m.JhipsterGenericAplicationGenericHistoryModule),
      },
      {
        path: 'generic-many-to-many',
        loadChildren: () =>
          import('./generic-many-to-many/generic-many-to-many.module').then(m => m.JhipsterGenericAplicationGenericManyToManyModule),
      },
      {
        path: 'generic-one-to-many',
        loadChildren: () =>
          import('./generic-one-to-many/generic-one-to-many.module').then(m => m.JhipsterGenericAplicationGenericOneToManyModule),
      },
      {
        path: 'generic-many-to-one',
        loadChildren: () =>
          import('./generic-many-to-one/generic-many-to-one.module').then(m => m.JhipsterGenericAplicationGenericManyToOneModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class JhipsterGenericAplicationEntityModule {}
