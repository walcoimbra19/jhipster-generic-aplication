import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenericOneToMany } from 'app/shared/model/generic-one-to-many.model';
import { GenericOneToManyService } from './generic-one-to-many.service';
import { GenericOneToManyDeleteDialogComponent } from './generic-one-to-many-delete-dialog.component';

@Component({
  selector: 'jhi-generic-one-to-many',
  templateUrl: './generic-one-to-many.component.html',
})
export class GenericOneToManyComponent implements OnInit, OnDestroy {
  genericOneToManies?: IGenericOneToMany[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected genericOneToManyService: GenericOneToManyService,
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
      this.genericOneToManyService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IGenericOneToMany[]>) => (this.genericOneToManies = res.body || []));
      return;
    }

    this.genericOneToManyService.query().subscribe((res: HttpResponse<IGenericOneToMany[]>) => (this.genericOneToManies = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGenericOneToManies();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGenericOneToMany): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGenericOneToManies(): void {
    this.eventSubscriber = this.eventManager.subscribe('genericOneToManyListModification', () => this.loadAll());
  }

  delete(genericOneToMany: IGenericOneToMany): void {
    const modalRef = this.modalService.open(GenericOneToManyDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.genericOneToMany = genericOneToMany;
  }
}
