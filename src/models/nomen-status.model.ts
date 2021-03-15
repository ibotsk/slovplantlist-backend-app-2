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
  allochthonous?: string;

  @property({
    type: 'string',
  })
  invasiveness?: string;

  @property({
    type: 'string',
  })
  cultivation?: string;

  @property({
    type: 'string',
  })
  protection?: string;

  @property({
    type: 'string',
  })
  endemism?: string;

  @property({
    type: 'string',
  })
  doubtfullness?: string;


  constructor(data?: Partial<NomenStatus>) {
    super(data);
  }
}

export interface NomenStatusRelations {
  // describe navigational properties here
}

export type NomenStatusWithRelations = NomenStatus & NomenStatusRelations;
