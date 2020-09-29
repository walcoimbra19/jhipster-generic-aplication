import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGenericOneToMany } from 'app/shared/model/generic-one-to-many.model';
import { GenericOneToManyService } from './generic-one-to-many.service';

@Component({
  templateUrl: './generic-one-to-many-delete-dialog.component.html',
})
export class GenericOneToManyDeleteDialogComponent {
  genericOneToMany?: IGenericOneToMany;

  constructor(
    protected genericOneToManyService: GenericOneToManyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genericOneToManyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('genericOneToManyListModification');
      this.activeModal.close();
    });
  }
}
