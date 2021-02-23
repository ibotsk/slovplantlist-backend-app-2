import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'synonyms',
})
export class Synonyms extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    name: 'id_parent',
    required: true,
  })
  idParent: string;

  @property({
    type: 'number',
    name: 'id_synonym',
    required: true,
  })
  idSynonym: number;

  @property({
    type: 'number',
    required: true,
  })
  syntype: number;

  @property({
    type: 'number',
  })
  rorder?: number;

  @property({
    type: 'string',
    name: 'misidentification_author',
  })
  misidentificationAuthor?: string;

  constructor(data?: Partial<Synonyms>) {
    super(data);
  }
}

export interface SynonymsRelations {
  // describe navigational properties here
}

export type SynonymsWithRelations = Synonyms & SynonymsRelations;
