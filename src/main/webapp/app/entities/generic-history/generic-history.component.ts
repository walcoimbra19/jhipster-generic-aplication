import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenericHistory } from 'app/shared/model/generic-history.model';
import { GenericHistoryService } from './generic-history.service';
import { GenericHistoryDeleteDialogComponent } from './generic-history-delete-dialog.component';

@Component({
  selector: 'jhi-generic-history',
  templateUrl: './generic-history.component.html',
})
export class GenericHistoryComponent implements OnInit, OnDestroy {
  genericHistories?: IGenericHistory[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected genericHistoryService: GenericHistoryService,
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
      this.genericHistoryService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IGenericHistory[]>) => (this.genericHistories = res.body || []));
      return;
    }

    this.genericHistoryService.query().subscribe((res: HttpResponse<IGenericHistory[]>) => (this.genericHistories = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGenericHistories();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGenericHistory): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGenericHistories(): void {
    this.eventSubscriber = this.eventManager.subscribe('genericHistoryListModification', () => this.loadAll());
  }

  delete(genericHistory: IGenericHistory): void {
    const modalRef = this.modalService.open(GenericHistoryDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.genericHistory = genericHistory;
  }
}
