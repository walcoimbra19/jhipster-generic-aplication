import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IGenericManyToOne } from 'app/shared/model/generic-many-to-one.model';
import { GenericManyToOneService } from './generic-many-to-one.service';
import { GenericManyToOneDeleteDialogComponent } from './generic-many-to-one-delete-dialog.component';

@Component({
  selector: 'jhi-generic-many-to-one',
  templateUrl: './generic-many-to-one.component.html',
})
export class GenericManyToOneComponent implements OnInit, OnDestroy {
  genericManyToOnes?: IGenericManyToOne[];
  eventSubscriber?: Subscription;
  currentSearch: string;

  constructor(
    protected genericManyToOneService: GenericManyToOneService,
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
      this.genericManyToOneService
        .search({
          query: this.currentSearch,
        })
        .subscribe((res: HttpResponse<IGenericManyToOne[]>) => (this.genericManyToOnes = res.body || []));
      return;
    }

    this.genericManyToOneService.query().subscribe((res: HttpResponse<IGenericManyToOne[]>) => (this.genericManyToOnes = res.body || []));
  }

  search(query: string): void {
    this.currentSearch = query;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInGenericManyToOnes();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IGenericManyToOne): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInGenericManyToOnes(): void {
    this.eventSubscriber = this.eventManager.subscribe('genericManyToOneListModification', () => this.loadAll());
  }

  delete(genericManyToOne: IGenericManyToOne): void {
    const modalRef = this.modalService.open(GenericManyToOneDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.genericManyToOne = genericManyToOne;
  }
}
