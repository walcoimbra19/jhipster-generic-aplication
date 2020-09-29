import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGenericManyToMany, GenericManyToMany } from 'app/shared/model/generic-many-to-many.model';
import { GenericManyToManyService } from './generic-many-to-many.service';

@Component({
  selector: 'jhi-generic-many-to-many-update',
  templateUrl: './generic-many-to-many-update.component.html',
})
export class GenericManyToManyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fieldManyToMany: [],
  });

  constructor(
    protected genericManyToManyService: GenericManyToManyService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genericManyToMany }) => {
      this.updateForm(genericManyToMany);
    });
  }

  updateForm(genericManyToMany: IGenericManyToMany): void {
    this.editForm.patchValue({
      id: genericManyToMany.id,
      fieldManyToMany: genericManyToMany.fieldManyToMany,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const genericManyToMany = this.createFromForm();
    if (genericManyToMany.id !== undefined) {
      this.subscribeToSaveResponse(this.genericManyToManyService.update(genericManyToMany));
    } else {
      this.subscribeToSaveResponse(this.genericManyToManyService.create(genericManyToMany));
    }
  }

  private createFromForm(): IGenericManyToMany {
    return {
      ...new GenericManyToMany(),
      id: this.editForm.get(['id'])!.value,
      fieldManyToMany: this.editForm.get(['fieldManyToMany'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenericManyToMany>>): void {
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
}
