import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IGenericManyToOne, GenericManyToOne } from 'app/shared/model/generic-many-to-one.model';
import { GenericManyToOneService } from './generic-many-to-one.service';

@Component({
  selector: 'jhi-generic-many-to-one-update',
  templateUrl: './generic-many-to-one-update.component.html',
})
export class GenericManyToOneUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fieldManyToOne: [],
  });

  constructor(
    protected genericManyToOneService: GenericManyToOneService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genericManyToOne }) => {
      this.updateForm(genericManyToOne);
    });
  }

  updateForm(genericManyToOne: IGenericManyToOne): void {
    this.editForm.patchValue({
      id: genericManyToOne.id,
      fieldManyToOne: genericManyToOne.fieldManyToOne,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const genericManyToOne = this.createFromForm();
    if (genericManyToOne.id !== undefined) {
      this.subscribeToSaveResponse(this.genericManyToOneService.update(genericManyToOne));
    } else {
      this.subscribeToSaveResponse(this.genericManyToOneService.create(genericManyToOne));
    }
  }

  private createFromForm(): IGenericManyToOne {
    return {
      ...new GenericManyToOne(),
      id: this.editForm.get(['id'])!.value,
      fieldManyToOne: this.editForm.get(['fieldManyToOne'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenericManyToOne>>): void {
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
