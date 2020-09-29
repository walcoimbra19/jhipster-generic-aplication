import { Moment } from 'moment';
import { IGenericHistory } from 'app/shared/model/generic-history.model';
import { IGenericOneToMany } from 'app/shared/model/generic-one-to-many.model';
import { IGenericManyToOne } from 'app/shared/model/generic-many-to-one.model';
import { IGenericManyToMany } from 'app/shared/model/generic-many-to-many.model';

export interface IGeneric {
  id?: number;
  fieldString?: string;
  fieldInteger?: number;
  fieldLong?: number;
  fieldBigDecimal?: number;
  fieldFloat?: number;
  fieldDouble?: number;
  fieldBoolean?: boolean;
  fieldLocalDate?: Moment;
  fieldZonedDateTime?: Moment;
  fieldDuration?: number;
  fieldUUID?: string;
  fieldBlobContentType?: string;
  fieldBlob?: any;
  fieldAnyBlobContentType?: string;
  fieldAnyBlob?: any;
  fieldImageBlobContentType?: string;
  fieldImageBlob?: any;
  fieldTextBlob?: any;
  genericHistory?: IGenericHistory;
  genericOneToManies?: IGenericOneToMany[];
  genericManyToOne?: IGenericManyToOne;
  genericManyToManies?: IGenericManyToMany[];
}

export class Generic implements IGeneric {
  constructor(
    public id?: number,
    public fieldString?: string,
    public fieldInteger?: number,
    public fieldLong?: number,
    public fieldBigDecimal?: number,
    public fieldFloat?: number,
    public fieldDouble?: number,
    public fieldBoolean?: boolean,
    public fieldLocalDate?: Moment,
    public fieldZonedDateTime?: Moment,
    public fieldDuration?: number,
    public fieldUUID?: string,
    public fieldBlobContentType?: string,
    public fieldBlob?: any,
    public fieldAnyBlobContentType?: string,
    public fieldAnyBlob?: any,
    public fieldImageBlobContentType?: string,
    public fieldImageBlob?: any,
    public fieldTextBlob?: any,
    public genericHistory?: IGenericHistory,
    public genericOneToManies?: IGenericOneToMany[],
    public genericManyToOne?: IGenericManyToOne,
    public genericManyToManies?: IGenericManyToMany[]
  ) {
    this.fieldBoolean = this.fieldBoolean || false;
  }
}
