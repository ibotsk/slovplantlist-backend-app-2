import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'nomen_status',
})
export class NomenStatus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    hidden: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
    name: 'id_nomenclature',
    hidden: true,
  })
  idNomenclature: number;

  @property({
    type: 'string',
  })
  origin?: string;

  @property({
    type: 'string',
  })
  cultivation?: string;

  @property({
    type: 'string',
  })
  invasiveness?: string;

  @property({
    type: 'string',
    name: 'residence_time',
  })
  residenceTime?: string;

  @property({
    type: 'string',
  })
  endemism?: string;

  @property({
    type: 'string',
  })
  threat?: string;

  @property({
    type: 'string',
    name: 'protection_prepared',
  })
  protectionPrepared?: string;

  @property({
    type: 'string',
    name: 'protection_current',
  })
  protectionCurrent?: string;

  constructor(data?: Partial<NomenStatus>) {
    super(data);
  }
}

export interface NomenStatusRelations {
  // describe navigational properties here
}

export type NomenStatusWithRelations = NomenStatus & NomenStatusRelations;
