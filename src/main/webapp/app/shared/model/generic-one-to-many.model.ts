import { IGeneric } from 'app/shared/model/generic.model';

export interface IGenericOneToMany {
  id?: number;
  fieldOneToMany?: string;
  generic?: IGeneric;
}

export class GenericOneToMany implements IGenericOneToMany {
  constructor(public id?: number, public fieldOneToMany?: string, public generic?: IGeneric) {}
}
