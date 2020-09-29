import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterGenericAplicationTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { GenericManyToOneDeleteDialogComponent } from 'app/entities/generic-many-to-one/generic-many-to-one-delete-dialog.component';
import { GenericManyToOneService } from 'app/entities/generic-many-to-one/generic-many-to-one.service';

describe('Component Tests', () => {
  describe('GenericManyToOne Management Delete Component', () => {
    let comp: GenericManyToOneDeleteDialogComponent;
    let fixture: ComponentFixture<GenericManyToOneDeleteDialogComponent>;
    let service: GenericManyToOneService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterGenericAplicationTestModule],
        declarations: [GenericManyToOneDeleteDialogComponent],
      })
        .overrideTemplate(GenericManyToOneDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(GenericManyToOneDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(GenericManyToOneService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
