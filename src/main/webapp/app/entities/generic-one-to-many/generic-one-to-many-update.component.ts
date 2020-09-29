import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGenericOneToMany, GenericOneToMany } from 'app/shared/model/generic-one-to-many.model';
import { GenericOneToManyService } from './generic-one-to-many.service';
import { IGeneric } from 'app/shared/model/generic.model';
import { GenericService } from 'app/entities/generic/generic.service';

@Component({
  selector: 'jhi-generic-one-to-many-update',
  templateUrl: './generic-one-to-many-update.component.html',
})
export class GenericOneToManyUpdateComponent implements OnInit {
  isSaving = false;
  generics: IGeneric[] = [];

  editForm = this.fb.group({
    id: [],
    fieldOneToMany: [],
    generic: [],
  });

  constructor(
    protected genericOneToManyService: GenericOneToManyService,
    protected genericService: GenericService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genericOneToMany }) => {
      this.updateForm(genericOneToMany);

      this.genericService.query().subscribe((res: HttpResponse<IGeneric[]>) => (this.generics = res.body || []));
    });
  }

  updateForm(genericOneToMany: IGenericOneToMany): void {
    this.editForm.patchValue({
      id: genericOneToMany.id,
      fieldOneToMany: genericOneToMany.fieldOneToMany,
      generic: genericOneToMany.generic,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const genericOneToMany = this.createFromForm();
    if (genericOneToMany.id !== undefined) {
      this.subscribeToSaveResponse(this.genericOneToManyService.update(genericOneToMany));
    } else {
      this.subscribeToSaveResponse(this.genericOneToManyService.create(genericOneToMany));
    }
  }

  private createFromForm(): IGenericOneToMany {
    return {
      ...new GenericOneToMany(),
      id: this.editForm.get(['id'])!.value,
      fieldOneToMany: this.editForm.get(['fieldOneToMany'])!.value,
      generic: this.editForm.get(['generic'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenericOneToMany>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IGeneric): any {
    return item.id;
  }
}
