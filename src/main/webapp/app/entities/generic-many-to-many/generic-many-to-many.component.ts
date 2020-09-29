import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenericManyToMany } from 'app/shared/model/generic-many-to-many.model';
import { GenericManyToManyService } from './generic-many-to-many.service';
import { GenericManyToManyDeleteDialogComponent } from './generic-many-to-many-delete-dialog.component';

@Component({
  selector: 'jhi-generic-many-to-many',
  templateUrl: './generic-many-to-many.component.html',
})
export class GenericManyToManyComponent implements OnInit, OnDestroy {
  genericManyToManies?: IGenericManyToMany[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected genericManyToManyService: GenericManyToManyService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected activatedRoute: ActivatedRoute
  ) {
    this.currentSearch =
      this.activatedRoute.snapshot && this.activatedRoute.snapshot.queryParams['search']
        ? this.activatedRoute.snapshot.queryParams['search']
        : '';
  }

  loadAll(): void {
    if (this.currentSearch) {
      this.genericManyToManyService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IGenericManyToMany[]>) => (this.genericManyToManies = res.body || []));
      return;
    }

    this.genericManyToManyService
      .query()
      .subscribe((res: HttpResponse<IGenericManyToMany[]>) => (this.genericManyToManies = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGenericManyToManies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGenericManyToMany): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGenericManyToManies(): void {
    this.eventSubscriber = this.eventManager.subscribe('genericManyToManyListModification', () => this.loadAll());
  }

  delete(genericManyToMany: IGenericManyToMany): void {
    const modalRef = this.modalService.open(GenericManyToManyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.genericManyToMany = genericManyToMany;
  }
}
