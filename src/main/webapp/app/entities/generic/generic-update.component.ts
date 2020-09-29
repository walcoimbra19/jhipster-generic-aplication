import { Component, OnInit, ElementRef } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IGeneric, Generic } from 'app/shared/model/generic.model';
import { GenericService } from './generic.service';
import { AlertError } from 'app/shared/alert/alert-error.model';
import { IGenericHistory } from 'app/shared/model/generic-history.model';
import { GenericHistoryService } from 'app/entities/generic-history/generic-history.service';
import { IGenericManyToOne } from 'app/shared/model/generic-many-to-one.model';
import { GenericManyToOneService } from 'app/entities/generic-many-to-one/generic-many-to-one.service';
import { IGenericManyToMany } from 'app/shared/model/generic-many-to-many.model';
import { GenericManyToManyService } from 'app/entities/generic-many-to-many/generic-many-to-many.service';

type SelectableEntity = IGenericHistory | IGenericManyToOne | IGenericManyToMany;

@Component({
  selector: 'jhi-generic-update',
  templateUrl: './generic-update.component.html',
})
export class GenericUpdateComponent implements OnInit {
  isSaving = false;
  generichistories: IGenericHistory[] = [];
  genericmanytoones: IGenericManyToOne[] = [];
  genericmanytomanies: IGenericManyToMany[] = [];
  fieldLocalDateDp: any;

  editForm = this.fb.group({
    id: [],
    fieldString: [null, [Validators.required]],
    fieldInteger: [],
    fieldLong: [],
    fieldBigDecimal: [],
    fieldFloat: [],
    fieldDouble: [],
    fieldBoolean: [],
    fieldLocalDate: [],
    fieldZonedDateTime: [],
    fieldDuration: [],
    fieldUUID: [],
    fieldBlob: [],
    fieldBlobContentType: [],
    fieldAnyBlob: [],
    fieldAnyBlobContentType: [],
    fieldImageBlob: [],
    fieldImageBlobContentType: [],
    fieldTextBlob: [],
    genericHistory: [],
    genericManyToOne: [],
    genericManyToManies: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected genericService: GenericService,
    protected genericHistoryService: GenericHistoryService,
    protected genericManyToOneService: GenericManyToOneService,
    protected genericManyToManyService: GenericManyToManyService,
    protected elementRef: ElementRef,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ generic }) => {
      if (!generic.id) {
        const today = moment().startOf('day');
        generic.fieldZonedDateTime = today;
      }

      this.updateForm(generic);

      this.genericHistoryService
        .query({ filter: 'generic-is-null' })
        .pipe(
          map((res: HttpResponse<IGenericHistory[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IGenericHistory[]) => {
          if (!generic.genericHistory || !generic.genericHistory.id) {
            this.generichistories = resBody;
          } else {
            this.genericHistoryService
              .find(generic.genericHistory.id)
              .pipe(
                map((subRes: HttpResponse<IGenericHistory>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IGenericHistory[]) => (this.generichistories = concatRes));
          }
        });

      this.genericManyToOneService.query().subscribe((res: HttpResponse<IGenericManyToOne[]>) => (this.genericmanytoones = res.body || []));

      this.genericManyToManyService
        .query()
        .subscribe((res: HttpResponse<IGenericManyToMany[]>) => (this.genericmanytomanies = res.body || []));
    });
  }

  updateForm(generic: IGeneric): void {
    this.editForm.patchValue({
      id: generic.id,
      fieldString: generic.fieldString,
      fieldInteger: generic.fieldInteger,
      fieldLong: generic.fieldLong,
      fieldBigDecimal: generic.fieldBigDecimal,
      fieldFloat: generic.fieldFloat,
      fieldDouble: generic.fieldDouble,
      fieldBoolean: generic.fieldBoolean,
      fieldLocalDate: generic.fieldLocalDate,
      fieldZonedDateTime: generic.fieldZonedDateTime ? generic.fieldZonedDateTime.format(DATE_TIME_FORMAT) : null,
      fieldDuration: generic.fieldDuration,
      fieldUUID: generic.fieldUUID,
      fieldBlob: generic.fieldBlob,
      fieldBlobContentType: generic.fieldBlobContentType,
      fieldAnyBlob: generic.fieldAnyBlob,
      fieldAnyBlobContentType: generic.fieldAnyBlobContentType,
      fieldImageBlob: generic.fieldImageBlob,
      fieldImageBlobContentType: generic.fieldImageBlobContentType,
      fieldTextBlob: generic.fieldTextBlob,
      genericHistory: generic.genericHistory,
      genericManyToOne: generic.genericManyToOne,
      genericManyToManies: generic.genericManyToManies,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('jhipsterGenericAplicationApp.error', { ...err, key: 'error.file.' + err.key })
      );
    });
  }

  clearInputImage(field: string, fieldContentType: string, idInput: string): void {
    this.editForm.patchValue({
      [field]: null,
      [fieldContentType]: null,
    });
    if (this.elementRef && idInput && this.elementRef.nativeElement.querySelector('#' + idInput)) {
      this.elementRef.nativeElement.querySelector('#' + idInput).value = null;
    }
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const generic = this.createFromForm();
    if (generic.id !== undefined) {
      this.subscribeToSaveResponse(this.genericService.update(generic));
    } else {
      this.subscribeToSaveResponse(this.genericService.create(generic));
    }
  }

  private createFromForm(): IGeneric {
    return {
      ...new Generic(),
      id: this.editForm.get(['id'])!.value,
      fieldString: this.editForm.get(['fieldString'])!.value,
      fieldInteger: this.editForm.get(['fieldInteger'])!.value,
      fieldLong: this.editForm.get(['fieldLong'])!.value,
      fieldBigDecimal: this.editForm.get(['fieldBigDecimal'])!.value,
      fieldFloat: this.editForm.get(['fieldFloat'])!.value,
      fieldDouble: this.editForm.get(['fieldDouble'])!.value,
      fieldBoolean: this.editForm.get(['fieldBoolean'])!.value,
      fieldLocalDate: this.editForm.get(['fieldLocalDate'])!.value,
      fieldZonedDateTime: this.editForm.get(['fieldZonedDateTime'])!.value
        ? moment(this.editForm.get(['fieldZonedDateTime'])!.value, DATE_TIME_FORMAT)
        : undefined,
      fieldDuration: this.editForm.get(['fieldDuration'])!.value,
      fieldUUID: this.editForm.get(['fieldUUID'])!.value,
      fieldBlobContentType: this.editForm.get(['fieldBlobContentType'])!.value,
      fieldBlob: this.editForm.get(['fieldBlob'])!.value,
      fieldAnyBlobContentType: this.editForm.get(['fieldAnyBlobContentType'])!.value,
      fieldAnyBlob: this.editForm.get(['fieldAnyBlob'])!.value,
      fieldImageBlobContentType: this.editForm.get(['fieldImageBlobContentType'])!.value,
      fieldImageBlob: this.editForm.get(['fieldImageBlob'])!.value,
      fieldTextBlob: this.editForm.get(['fieldTextBlob'])!.value,
      genericHistory: this.editForm.get(['genericHistory'])!.value,
      genericManyToOne: this.editForm.get(['genericManyToOne'])!.value,
      genericManyToManies: this.editForm.get(['genericManyToManies'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IGeneric>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IGenericManyToMany[], option: IGenericManyToMany): IGenericManyToMany {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
