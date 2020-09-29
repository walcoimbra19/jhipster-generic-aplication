import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterGenericAplicationSharedModule } from 'app/shared/shared.module';
import { GenericHistoryComponent } from './generic-history.component';
import { GenericHistoryDetailComponent } from './generic-history-detail.component';
import { GenericHistoryUpdateComponent } from './generic-history-update.component';
import { GenericHistoryDeleteDialogComponent } from './generic-history-delete-dialog.component';
import { genericHistoryRoute } from './generic-history.route';

@NgModule({
  imports: [JhipsterGenericAplicationSharedModule, RouterModule.forChild(genericHistoryRoute)],
  declarations: [
    GenericHistoryComponent,
    GenericHistoryDetailComponent,
    GenericHistoryUpdateComponent,
    GenericHistoryDeleteDialogComponent,
  ],
  entryComponents: [GenericHistoryDeleteDialogComponent],
})
export class JhipsterGenericAplicationGenericHistoryModule {}
