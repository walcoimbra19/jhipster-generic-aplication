import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericManyToOneComponent } from 'app/entities/generic-many-to-one/generic-many-to-one.component';
import { GenericManyToOneService } from 'app/entities/generic-many-to-one/generic-many-to-one.service';
import { GenericManyToOne } from 'app/shared/model/generic-many-to-one.model';

describe('Component Tests', () => {
  describe('GenericManyToOne Management Component', () => {
    let comp: GenericManyToOneComponent;
    let fixture: ComponentFixture<GenericManyToOneComponent>;
    let service: GenericManyToOneService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericManyToOneComponent],
      })
        .overrideTemplate(GenericManyToOneComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericManyToOneComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericManyToOneService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GenericManyToOne(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.genericManyToOnes && comp.genericManyToOnes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
