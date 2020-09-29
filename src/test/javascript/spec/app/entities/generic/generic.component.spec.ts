import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericComponent } from 'app/entities/generic/generic.component';
import { GenericService } from 'app/entities/generic/generic.service';
import { Generic } from 'app/shared/model/generic.model';

describe('Component Tests', () => {
  describe('Generic Management Component', () => {
    let comp: GenericComponent;
    let fixture: ComponentFixture<GenericComponent>;
    let service: GenericService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericComponent],
      })
        .overrideTemplate(GenericComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Generic(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.generics && comp.generics[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
