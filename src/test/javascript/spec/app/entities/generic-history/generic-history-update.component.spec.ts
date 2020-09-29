import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericHistoryUpdateComponent } from 'app/entities/generic-history/generic-history-update.component';
import { GenericHistoryService } from 'app/entities/generic-history/generic-history.service';
import { GenericHistory } from 'app/shared/model/generic-history.model';

describe('Component Tests', () => {
  describe('GenericHistory Management Update Component', () => {
    let comp: GenericHistoryUpdateComponent;
    let fixture: ComponentFixture<GenericHistoryUpdateComponent>;
    let service: GenericHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericHistoryUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GenericHistoryUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericHistoryUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericHistoryService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GenericHistory(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new GenericHistory();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
