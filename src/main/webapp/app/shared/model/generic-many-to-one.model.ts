export interface IGenericManyToOne {
  id?: number;
  fieldManyToOne?: string;
}

export class GenericManyToOne implements IGenericManyToOne {
  constructor(public id?: number, public fieldManyToOne?: string) {}
}
