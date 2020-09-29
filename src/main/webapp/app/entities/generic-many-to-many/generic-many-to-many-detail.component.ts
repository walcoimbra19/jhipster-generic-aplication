import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGenericManyToMany } from 'app/shared/model/generic-many-to-many.model';

@Component({
  selector: 'jhi-generic-many-to-many-detail',
  templateUrl: './generic-many-to-many-detail.component.html',
})
export class GenericManyToManyDetailComponent implements OnInit {
  genericManyToMany: IGenericManyToMany | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genericManyToMany }) => (this.genericManyToMany = genericManyToMany));
  }

  previousState(): void {
    window.history.back();
  }
}
