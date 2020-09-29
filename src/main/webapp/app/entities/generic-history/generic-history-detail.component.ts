import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenericHistory } from 'app/shared/model/generic-history.model';

@Component({
  selector: 'jhi-generic-history-detail',
  templateUrl: './generic-history-detail.component.html',
})
export class GenericHistoryDetailComponent implements OnInit {
  genericHistory: IGenericHistory | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genericHistory }) => (this.genericHistory = genericHistory));
  }

  previousState(): void {
    window.history.back();
  }
}
