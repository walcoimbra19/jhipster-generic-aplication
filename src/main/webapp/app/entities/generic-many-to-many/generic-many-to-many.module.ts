import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterGenericAplicationSharedModule } from 'app/shared/shared.module';
import { GenericManyToManyComponent } from './generic-many-to-many.component';
import { GenericManyToManyDetailComponent } from './generic-many-to-many-detail.component';
import { GenericManyToManyUpdateComponent } from './generic-many-to-many-update.component';
import { GenericManyToManyDeleteDialogComponent } from './generic-many-to-many-delete-dialog.component';
import { genericManyToManyRoute } from './generic-many-to-many.route';

@NgModule({
  imports: [JhipsterGenericAplicationSharedModule, RouterModule.forChild(genericManyToManyRoute)],
  declarations: [
    GenericManyToManyComponent,
    GenericManyToManyDetailComponent,
    GenericManyToManyUpdateComponent,
    GenericManyToManyDeleteDialogComponent,
  ],
  entryComponents: [GenericManyToManyDeleteDialogComponent],
})
export class JhipsterGenericAplicationGenericManyToManyModule {}
