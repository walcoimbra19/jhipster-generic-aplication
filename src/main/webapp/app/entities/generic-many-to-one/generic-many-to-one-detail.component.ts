import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenericManyToOne } from 'app/shared/model/generic-many-to-one.model';

@Component({
  selector: 'jhi-generic-many-to-one-detail',
  templateUrl: './generic-many-to-one-detail.component.html',
})
export class GenericManyToOneDetailComponent implements OnInit {
  genericManyToOne: IGenericManyToOne | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genericManyToOne }) => (this.genericManyToOne = genericManyToOne));
  }

  previousState(): void {
    window.history.back();
  }
}
