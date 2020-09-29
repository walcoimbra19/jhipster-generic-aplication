import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterGenericAplicationSharedModule } from 'app/shared/shared.module';
import { GenericComponent } from './generic.component';
import { GenericDetailComponent } from './generic-detail.component';
import { GenericUpdateComponent } from './generic-update.component';
import { GenericDeleteDialogComponent } from './generic-delete-dialog.component';
import { genericRoute } from './generic.route';

@NgModule({
  imports: [JhipsterGenericAplicationSharedModule, RouterModule.forChild(genericRoute)],
  declarations: [GenericComponent, GenericDetailComponent, GenericUpdateComponent, GenericDeleteDialogComponent],
  entryComponents: [GenericDeleteDialogComponent],
})
export class JhipsterGenericAplicationGenericModule {}
