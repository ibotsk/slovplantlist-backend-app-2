import { Entity, model, property } from '@loopback/repository';

@model({
  name: 'genus',
})
export class Genus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    hidden: true,
  })
  id?: number;

  @property({
    type: 'string',
    name: 'ntype',
  })
  status?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
  })
  authors?: string;

  @property({
    type: 'string',
  })
  vernacular?: string;

  @property({
    type: 'number',
    hidden: true,
  })
  idFamily?: number;

  @property({
    type: 'number',
    hidden: true,
  })
  idFamilyApg?: number;


  constructor(data?: Partial<Genus>) {
    super(data);
  }
}

export interface GenusRelations {
  // describe navigational properties here
}

export type GenusWithRelations = Genus & GenusRelations;