import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericOneToManyDetailComponent } from 'app/entities/generic-one-to-many/generic-one-to-many-detail.component';
import { GenericOneToMany } from 'app/shared/model/generic-one-to-many.model';

describe('Component Tests', () => {
  describe('GenericOneToMany Management Detail Component', () => {
    let comp: GenericOneToManyDetailComponent;
    let fixture: ComponentFixture<GenericOneToManyDetailComponent>;
    const route = ({ data: of({ genericOneToMany: new GenericOneToMany(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericOneToManyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GenericOneToManyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenericOneToManyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load genericOneToMany on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.genericOneToMany).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
