import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericOneToManyUpdateComponent } from 'app/entities/generic-one-to-many/generic-one-to-many-update.component';
import { GenericOneToManyService } from 'app/entities/generic-one-to-many/generic-one-to-many.service';
import { GenericOneToMany } from 'app/shared/model/generic-one-to-many.model';

describe('Component Tests', () => {
  describe('GenericOneToMany Management Update Component', () => {
    let comp: GenericOneToManyUpdateComponent;
    let fixture: ComponentFixture<GenericOneToManyUpdateComponent>;
    let service: GenericOneToManyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericOneToManyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GenericOneToManyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericOneToManyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericOneToManyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GenericOneToMany(123);
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
        const entity = new GenericOneToMany();
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
