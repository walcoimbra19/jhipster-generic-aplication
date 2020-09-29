import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericManyToOneUpdateComponent } from 'app/entities/generic-many-to-one/generic-many-to-one-update.component';
import { GenericManyToOneService } from 'app/entities/generic-many-to-one/generic-many-to-one.service';
import { GenericManyToOne } from 'app/shared/model/generic-many-to-one.model';

describe('Component Tests', () => {
  describe('GenericManyToOne Management Update Component', () => {
    let comp: GenericManyToOneUpdateComponent;
    let fixture: ComponentFixture<GenericManyToOneUpdateComponent>;
    let service: GenericManyToOneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericManyToOneUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(GenericManyToOneUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericManyToOneUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericManyToOneService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new GenericManyToOne(123);
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
        const entity = new GenericManyToOne();
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
