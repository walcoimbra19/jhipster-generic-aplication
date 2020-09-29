import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGeneric } from 'app/shared/model/generic.model';
import { GenericService } from './generic.service';

@Component({
  templateUrl: './generic-delete-dialog.component.html',
})
export class GenericDeleteDialogComponent {
  generic?: IGeneric;

  constructor(protected genericService: GenericService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genericService.delete(id).subscribe(() => {
      this.eventManager.broadcast('genericListModification');
      this.activeModal.close();
    });
  }
}
