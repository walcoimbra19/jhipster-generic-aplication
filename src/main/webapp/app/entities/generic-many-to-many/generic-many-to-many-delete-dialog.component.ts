import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGenericManyToMany } from 'app/shared/model/generic-many-to-many.model';
import { GenericManyToManyService } from './generic-many-to-many.service';

@Component({
  templateUrl: './generic-many-to-many-delete-dialog.component.html',
})
export class GenericManyToManyDeleteDialogComponent {
  genericManyToMany?: IGenericManyToMany;

  constructor(
    protected genericManyToManyService: GenericManyToManyService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.genericManyToManyService.delete(id).subscribe(() => {
      this.eventManager.broadcast('genericManyToManyListModification');
      this.activeModal.close();
    });
  }
}
