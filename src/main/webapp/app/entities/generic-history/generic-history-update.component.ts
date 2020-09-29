import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IGenericHistory, GenericHistory } from 'app/shared/model/generic-history.model';
import { GenericHistoryService } from './generic-history.service';

@Component({
  selector: 'jhi-generic-history-update',
  templateUrl: './generic-history-update.component.html',
})
export class GenericHistoryUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    startDate: [],
    endDate: [],
    language: [],
  });

  constructor(protected genericHistoryService: GenericHistoryService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ genericHistory }) => {
      if (!genericHistory.id) {
        const today = moment().startOf('day');
        genericHistory.startDate = today;
        genericHistory.endDate = today;
      }

      this.updateForm(genericHistory);
    });
  }

  updateForm(genericHistory: IGenericHistory): void {
    this.editForm.patchValue({
      id: genericHistory.id,
      startDate: genericHistory.startDate ? genericHistory.startDate.format(DATE_TIME_FORMAT) : null,
      endDate: genericHistory.endDate ? genericHistory.endDate.format(DATE_TIME_FORMAT) : null,
      language: genericHistory.language,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const genericHistory = this.createFromForm();
    if (genericHistory.id !== undefined) {
      this.subscribeToSaveResponse(this.genericHistoryService.update(genericHistory));
    } else {
      this.subscribeToSaveResponse(this.genericHistoryService.create(genericHistory));
    }
  }

  private createFromForm(): IGenericHistory {
    return {
      ...new GenericHistory(),
      id: this.editForm.get(['id'])!.value,
      startDate: this.editForm.get(['startDate'])!.value ? moment(this.editForm.get(['startDate'])!.value, DATE_TIME_FORMAT) : undefined,
      endDate: this.editForm.get(['endDate'])!.value ? moment(this.editForm.get(['endDate'])!.value, DATE_TIME_FORMAT) : undefined,
      language: this.editForm.get(['language'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGenericHistory>>): void {
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
