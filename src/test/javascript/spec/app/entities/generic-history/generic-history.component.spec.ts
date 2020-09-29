import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericHistoryComponent } from 'app/entities/generic-history/generic-history.component';
import { GenericHistoryService } from 'app/entities/generic-history/generic-history.service';
import { GenericHistory } from 'app/shared/model/generic-history.model';

describe('Component Tests', () => {
  describe('GenericHistory Management Component', () => {
    let comp: GenericHistoryComponent;
    let fixture: ComponentFixture<GenericHistoryComponent>;
    let service: GenericHistoryService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericHistoryComponent],
      })
        .overrideTemplate(GenericHistoryComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(GenericHistoryComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericHistoryService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new GenericHistory(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.genericHistories && comp.genericHistories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
