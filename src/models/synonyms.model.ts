import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Nomenclature} from './nomenclature.model';

@model({
  name: 'synonyms',
})
export class Synonyms extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
    hidden: true,
  })
  id?: number;

  @property({
    type: 'number',
    name: 'id_parent',
    required: true,
    hidden: true,
  })
  idParent: number;
  @property({
    type: 'number',
    required: true,
    hidden: true,
  })
  syntype: number;

  @property({
    type: 'number',
    hidden: true,
  })
  rorder?: number;

  @property({
    type: 'string',
    name: 'misidentification_author',
  })
  misidentificationAuthor?: string;

  @belongsTo(() => Nomenclature, {name: 'synonym'}, {
    name: 'id_synonym',
    hidden: true,
  })
  idSynonym: number;

  constructor(data?: Partial<Synonyms>) {
    super(data);
  }
}

export interface SynonymsRelations {
  synonym: Nomenclature;
}

export type SynonymsWithRelations = Synonyms & SynonymsRelations;
