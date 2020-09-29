import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGeneric } from 'app/shared/model/generic.model';
import { GenericService } from './generic.service';
import { GenericDeleteDialogComponent } from './generic-delete-dialog.component';

@Component({
  selector: 'jhi-generic',
  templateUrl: './generic.component.html',
})
export class GenericComponent implements OnInit, OnDestroy {
  generics?: IGeneric[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected genericService: GenericService,
    protected dataUtils: JhiDataUtils,
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
      this.genericService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IGeneric[]>) => (this.generics = res.body || []));
      return;
    }

    this.genericService.query().subscribe((res: HttpResponse<IGeneric[]>) => (this.generics = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGenerics();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGeneric): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    return this.dataUtils.openFile(contentType, base64String);
  }

  registerChangeInGenerics(): void {
    this.eventSubscriber = this.eventManager.subscribe('genericListModification', () => this.loadAll());
  }

  delete(generic: IGeneric): void {
    const modalRef = this.modalService.open(GenericDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.generic = generic;
  }
}
