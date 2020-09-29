import { IGenericManyToOne } from 'app/shared/model/generic-many-to-one.model';

export interface IGenericOneToMany {
  id?: number;
  fieldOneToMany?: string;
  genericManyToOne?: IGenericManyToOne;
}

export class GenericOneToMany implements IGenericOneToMany {
  constructor(public id?: number, public fieldOneToMany?: string, public genericManyToOne?: IGenericManyToOne) {}
}
