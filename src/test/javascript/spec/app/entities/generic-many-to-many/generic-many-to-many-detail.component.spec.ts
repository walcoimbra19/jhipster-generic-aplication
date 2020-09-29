import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericManyToManyDetailComponent } from 'app/entities/generic-many-to-many/generic-many-to-many-detail.component';
import { GenericManyToMany } from 'app/shared/model/generic-many-to-many.model';

describe('Component Tests', () => {
  describe('GenericManyToMany Management Detail Component', () => {
    let comp: GenericManyToManyDetailComponent;
    let fixture: ComponentFixture<GenericManyToManyDetailComponent>;
    const route = ({ data: of({ genericManyToMany: new GenericManyToMany(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericManyToManyDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GenericManyToManyDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenericManyToManyDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load genericManyToMany on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.genericManyToMany).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
