import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'nomenclature',
})
export class Nomenclature extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    name: 'ntype',
    required: true,
  })
  status: string;

  @property({
    type: 'boolean',
    required: true,
  })
  hybrid: boolean;

  @property({
    type: 'string',
  })
  genus?: string;

  @property({
    type: 'string',
  })
  species?: string;

  @property({
    type: 'string',
  })
  subsp?: string;

  @property({
    type: 'string',
  })
  var?: string;

  @property({
    type: 'string',
  })
  subvar?: string;

  @property({
    type: 'string',
  })
  forma?: string;

  @property({
    type: 'string',
  })
  nothosubsp?: string;

  @property({
    type: 'string',
  })
  nothoforma?: string;

  @property({
    type: 'string',
  })
  proles?: string;

  @property({
    type: 'string',
  })
  unranked?: string;

  @property({
    type: 'string',
  })
  authors?: string;

  @property({
    type: 'string',
    name: 'genus_h',
    defaultOrder: 10,
  })
  genusH?: string;

  @property({
    type: 'string',
    name: 'species_h',
    defaultOrder: 11,
  })
  speciesH?: string;

  @property({
    type: 'string',
    name: 'subsp_h',
    infraspecific: true,
    defaultOrder: 12,
  })
  subspH?: string;

  @property({
    type: 'string',
    name: 'var_h',
    infraspecific: true,
    defaultOrder: 13,
  })
  varH?: string;

  @property({
    type: 'string',
    name: 'subvar_h',
    infraspecific: true,
    defaultOrder: 14,
  })
  subvarH?: string;

  @property({
    type: 'string',
    name: 'forma_h',
    infraspecific: true,
    defaultOrder: 15,
  })
  formaH?: string;

  @property({
    type: 'string',
    name: 'nothosubsp_h',
    infraspecific: true,
    defaultOrder: 16,
  })
  nothosubspH?: string;

  @property({
    type: 'string',
    name: 'nothoforma_h',
    infraspecific: true,
    defaultOrder: 17,
  })
  nothoformaH?: string;

  @property({
    type: 'string',
    name: 'authors_h',
    defaultOrder: 18,
  })
  authorsH?: string;

  @property({
    type: 'string',
  })
  publication?: string;

  @property({
    type: 'string',
  })
  tribus?: string;

  @property({
    type: 'string',
  })
  vernacular?: string;

  @property({
    type: 'string',
  })
  aggregate?: string;

  @property({
    type: 'string',
  })
  subaggregate?: string;

  constructor(data?: Partial<Nomenclature>) {
    super(data);
  }
}

export interface NomenclatureRelations {
  // describe navigational properties here
}

export type NomenclatureWithRelations = Nomenclature & NomenclatureRelations;
