import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGenericManyToOne } from 'app/shared/model/generic-many-to-one.model';
import { GenericManyToOneService } from './generic-many-to-one.service';

@Component({
  templateUrl: './generic-many-to-one-delete-dialog.component.html',
})
export class GenericManyToOneDeleteDialogComponent {
  genericManyToOne?: IGenericManyToOne;

  constructor(
    protected genericManyToOneService: GenericManyToOneService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genericManyToOneService.delete(id).subscribe(() => {
      this.eventManager.broadcast('genericManyToOneListModification');
      this.activeModal.close();
    });
  }
}
