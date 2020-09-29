import { IGenericOneToMany } from 'app/shared/model/generic-one-to-many.model';

export interface IGenericManyToOne {
  id?: number;
  fieldManyToOne?: string;
  genericOneToManies?: IGenericOneToMany[];
}

export class GenericManyToOne implements IGenericManyToOne {
  constructor(public id?: number, public fieldManyToOne?: string, public genericOneToManies?: IGenericOneToMany[]) {}
}
