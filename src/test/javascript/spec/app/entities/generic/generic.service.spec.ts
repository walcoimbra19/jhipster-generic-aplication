import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT, DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { GenericService } from 'app/entities/generic/generic.service';
import { IGeneric, Generic } from 'app/shared/model/generic.model';

describe('Service Tests', () => {
  describe('Generic Service', () => {
    let injector: TestBed;
    let service: GenericService;
    let httpMock: HttpTestingController;
    let elemDefault: IGeneric;
    let expectedResult: IGeneric | IGeneric[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(GenericService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Generic(
        0,
        'AAAAAAA',
        0,
        0,
        0,
        0,
        0,
        false,
        currentDate,
        currentDate,
        0,
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fieldLocalDate: currentDate.format(DATE_FORMAT),
            fieldZonedDateTime: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Generic', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fieldLocalDate: currentDate.format(DATE_FORMAT),
            fieldZonedDateTime: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fieldLocalDate: currentDate,
            fieldZonedDateTime: currentDate,
          },
          returnedFromService
        );

        service.create(new Generic()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Generic', () => {
        const returnedFromService = Object.assign(
          {
            fieldString: 'BBBBBB',
            fieldInteger: 1,
            fieldLong: 1,
            fieldBigDecimal: 1,
            fieldFloat: 1,
            fieldDouble: 1,
            fieldBoolean: true,
            fieldLocalDate: currentDate.format(DATE_FORMAT),
            fieldZonedDateTime: currentDate.format(DATE_TIME_FORMAT),
            fieldDuration: 'BBBBBB',
            fieldUUID: 'BBBBBB',
            fieldBlob: 'BBBBBB',
            fieldAnyBlob: 'BBBBBB',
            fieldImageBlob: 'BBBBBB',
            fieldTextBlob: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fieldLocalDate: currentDate,
            fieldZonedDateTime: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Generic', () => {
        const returnedFromService = Object.assign(
          {
            fieldString: 'BBBBBB',
            fieldInteger: 1,
            fieldLong: 1,
            fieldBigDecimal: 1,
            fieldFloat: 1,
            fieldDouble: 1,
            fieldBoolean: true,
            fieldLocalDate: currentDate.format(DATE_FORMAT),
            fieldZonedDateTime: currentDate.format(DATE_TIME_FORMAT),
            fieldDuration: 'BBBBBB',
            fieldUUID: 'BBBBBB',
            fieldBlob: 'BBBBBB',
            fieldAnyBlob: 'BBBBBB',
            fieldImageBlob: 'BBBBBB',
            fieldTextBlob: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fieldLocalDate: currentDate,
            fieldZonedDateTime: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Generic', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
