import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericManyToManyComponent } from 'app/entities/generic-many-to-many/generic-many-to-many.component';
import { GenericManyToManyService } from 'app/entities/generic-many-to-many/generic-many-to-many.service';
import { GenericManyToMany } from 'app/shared/model/generic-many-to-many.model';

describe('Component Tests', () => {
  describe('GenericManyToMany Management Component', () => {
    let comp: GenericManyToManyComponent;
    let fixture: ComponentFixture<GenericManyToManyComponent>;
    let service: GenericManyToManyService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericManyToManyComponent],
      })
        .overrideTemplate(GenericManyToManyComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericManyToManyComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericManyToManyService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GenericManyToMany(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.genericManyToManies && comp.genericManyToManies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
