import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { GenericManyToOneDetailComponent } from 'app/entities/generic-many-to-one/generic-many-to-one-detail.component';
import { GenericManyToOne } from 'app/shared/model/generic-many-to-one.model';

describe('Component Tests', () => {
  describe('GenericManyToOne Management Detail Component', () => {
    let comp: GenericManyToOneDetailComponent;
    let fixture: ComponentFixture<GenericManyToOneDetailComponent>;
    const route = ({ data: of({ genericManyToOne: new GenericManyToOne(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericManyToOneDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(GenericManyToOneDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenericManyToOneDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load genericManyToOne on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.genericManyToOne).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
