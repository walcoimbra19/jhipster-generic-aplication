import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterGenericAplicationSharedModule } from 'app/shared/shared.module';
import { GenericManyToOneComponent } from './generic-many-to-one.component';
import { GenericManyToOneDetailComponent } from './generic-many-to-one-detail.component';
import { GenericManyToOneUpdateComponent } from './generic-many-to-one-update.component';
import { GenericManyToOneDeleteDialogComponent } from './generic-many-to-one-delete-dialog.component';
import { genericManyToOneRoute } from './generic-many-to-one.route';

@NgModule({
  imports: [JhipsterGenericAplicationSharedModule, RouterModule.forChild(genericManyToOneRoute)],
  declarations: [
    GenericManyToOneComponent,
    GenericManyToOneDetailComponent,
    GenericManyToOneUpdateComponent,
    GenericManyToOneDeleteDialogComponent,
  ],
  entryComponents: [GenericManyToOneDeleteDialogComponent],
})
export class JhipsterGenericAplicationGenericManyToOneModule {}
