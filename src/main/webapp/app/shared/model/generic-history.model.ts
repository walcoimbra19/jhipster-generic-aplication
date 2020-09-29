import { Moment } from 'moment';
import { Language } from 'app/shared/model/enumerations/language.model';

export interface IGenericHistory {
  id?: number;
  startDate?: Moment;
  endDate?: Moment;
  language?: Language;
}

export class GenericHistory implements IGenericHistory {
  constructor(public id?: number, public startDate?: Moment, public endDate?: Moment, public language?: Language) {}
}
