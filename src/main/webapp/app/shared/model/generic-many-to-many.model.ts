import { IGeneric } from 'app/shared/model/generic.model';

export interface IGenericManyToMany {
  id?: number;
  fieldManyToMany?: string;
  generics?: IGeneric[];
}

export class GenericManyToMany implements IGenericManyToMany {
  constructor(public id?: number, public fieldManyToMany?: string, public generics?: IGeneric[]) {}
}
