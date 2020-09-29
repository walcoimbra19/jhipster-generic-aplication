import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericHistoryDetailComponent } from 'app/entities/generic-history/generic-history-detail.component';
import { GenericHistory } from 'app/shared/model/generic-history.model';

describe('Component Tests', () => {
  describe('GenericHistory Management Detail Component', () => {
    let comp: GenericHistoryDetailComponent;
    let fixture: ComponentFixture<GenericHistoryDetailComponent>;
    const route = ({ data: of({ genericHistory: new GenericHistory(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericHistoryDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GenericHistoryDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenericHistoryDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load genericHistory on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.genericHistory).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
