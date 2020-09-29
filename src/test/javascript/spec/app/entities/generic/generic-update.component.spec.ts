import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericUpdateComponent } from 'app/entities/generic/generic-update.component';
import { GenericService } from 'app/entities/generic/generic.service';
import { Generic } from 'app/shared/model/generic.model';

describe('Component Tests', () => {
  describe('Generic Management Update Component', () => {
    let comp: GenericUpdateComponent;
    let fixture: ComponentFixture<GenericUpdateComponent>;
    let service: GenericService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GenericUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Generic(123);
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
        const entity = new Generic();
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
