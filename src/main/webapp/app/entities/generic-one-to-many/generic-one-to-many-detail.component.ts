import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenericOneToMany } from 'app/shared/model/generic-one-to-many.model';

@Component({
  selector: 'jhi-generic-one-to-many-detail',
  templateUrl: './generic-one-to-many-detail.component.html',
})
export class GenericOneToManyDetailComponent implements OnInit {
  genericOneToMany: IGenericOneToMany | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genericOneToMany }) => (this.genericOneToMany = genericOneToMany));
  }

  previousState(): void {
    window.history.back();
  }
}
