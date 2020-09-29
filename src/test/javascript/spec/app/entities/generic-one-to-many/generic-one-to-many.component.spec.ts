import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericOneToManyComponent } from 'app/entities/generic-one-to-many/generic-one-to-many.component';
import { GenericOneToManyService } from 'app/entities/generic-one-to-many/generic-one-to-many.service';
import { GenericOneToMany } from 'app/shared/model/generic-one-to-many.model';

describe('Component Tests', () => {
  describe('GenericOneToMany Management Component', () => {
    let comp: GenericOneToManyComponent;
    let fixture: ComponentFixture<GenericOneToManyComponent>;
    let service: GenericOneToManyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericOneToManyComponent],
      })
        .overrideTemplate(GenericOneToManyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericOneToManyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericOneToManyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GenericOneToMany(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.genericOneToManies && comp.genericOneToManies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
