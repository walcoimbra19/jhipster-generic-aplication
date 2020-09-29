import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGenericHistory } from 'app/shared/model/generic-history.model';
import { GenericHistoryService } from './generic-history.service';

@Component({
  templateUrl: './generic-history-delete-dialog.component.html',
})
export class GenericHistoryDeleteDialogComponent {
  genericHistory?: IGenericHistory;

  constructor(
    protected genericHistoryService: GenericHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genericHistoryService.delete(id).subscribe(() => {
      this.eventManager.broadcast('genericHistoryListModification');
      this.activeModal.close();
    });
  }
}
