import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericManyToManyUpdateComponent } from 'app/entities/generic-many-to-many/generic-many-to-many-update.component';
import { GenericManyToManyService } from 'app/entities/generic-many-to-many/generic-many-to-many.service';
import { GenericManyToMany } from 'app/shared/model/generic-many-to-many.model';

describe('Component Tests', () => {
  describe('GenericManyToMany Management Update Component', () => {
    let comp: GenericManyToManyUpdateComponent;
    let fixture: ComponentFixture<GenericManyToManyUpdateComponent>;
    let service: GenericManyToManyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericManyToManyUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GenericManyToManyUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericManyToManyUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericManyToManyService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GenericManyToMany(123);
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
        const entity = new GenericManyToMany();
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
