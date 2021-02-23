import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'v_nomenclature_search',
})
export class NomenclatureSearch extends Entity {
  @property({
    type: 'number',
    id: true,
    defaultOrder: 19,
  })
  id?: number;

  @property({
    type: 'string',
  })
  status?: string;

  @property({
    type: 'boolean',
    default: false,
  })
  hybrid?: boolean;

  @property({
    type: 'string',
    defaultOrder: 1,
  })
  genus?: string;

  @property({
    type: 'string',
    defaultOrder: 2,
  })
  species?: string;

  @property({
    type: 'string',
    infraspecific: true,
    defaultOrder: 3,
  })
  subsp?: string;

  @property({
    type: 'string',
    infraspecific: true,
    defaultOrder: 4,
  })
  var?: string;

  @property({
    type: 'string',
    infraspecific: true,
    defaultOrder: 5,
  })
  subvar?: string;

  @property({
    type: 'string',
    infraspecific: true,
    defaultOrder: 6,
  })
  forma?: string;

  @property({
    type: 'string',
    infraspecific: true,
    defaultOrder: 7,
  })
  nothosubsp?: string;

  @property({
    type: 'string',
    infraspecific: true,
    defaultOrder: 8,
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
    defaultOrder: 9,
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
  vernacular?: string;

  @property({
    type: 'string',
  })
  aggregate?: string;

  @property({
    type: 'string',
  })
  subaggregate?: string;

  constructor(data?: Partial<NomenclatureSearch>) {
    super(data);
  }
}

export interface NomenclatureSearchRelations {
  // describe navigational properties here
}

export type NomenclatureSearchWithRelations = NomenclatureSearch & NomenclatureSearchRelations;
