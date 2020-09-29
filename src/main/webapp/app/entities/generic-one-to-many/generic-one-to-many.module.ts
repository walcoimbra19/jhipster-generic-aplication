import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterGenericAplicationSharedModule } from 'app/shared/shared.module';
import { GenericOneToManyComponent } from './generic-one-to-many.component';
import { GenericOneToManyDetailComponent } from './generic-one-to-many-detail.component';
import { GenericOneToManyUpdateComponent } from './generic-one-to-many-update.component';
import { GenericOneToManyDeleteDialogComponent } from './generic-one-to-many-delete-dialog.component';
import { genericOneToManyRoute } from './generic-one-to-many.route';

@NgModule({
  imports: [JhipsterGenericAplicationSharedModule, RouterModule.forChild(genericOneToManyRoute)],
  declarations: [
    GenericOneToManyComponent,
    GenericOneToManyDetailComponent,
    GenericOneToManyUpdateComponent,
    GenericOneToManyDeleteDialogComponent,
  ],
  entryComponents: [GenericOneToManyDeleteDialogComponent],
})
export class JhipsterGenericAplicationGenericOneToManyModule {}
