import { Entity, model, property, belongsTo} from '@loopback/repository';
import {FamilyApg} from './family-apg.model';

@model({
  name: 'genus',
})
export class Genus extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
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
    name: 'id_family',
    hidden: true,
  })
  idFamily?: number;

  @belongsTo(() => FamilyApg, {name: 'family'}, {
    name: 'id_family_apg',
    hidden: true,
  })
  idFamilyApg: number;

  constructor(data?: Partial<Genus>) {
    super(data);
  }
}

export interface GenusRelations {
  // describe navigational properties here
}

export type GenusWithRelations = Genus & GenusRelations;
