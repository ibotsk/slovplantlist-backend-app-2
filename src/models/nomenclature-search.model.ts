import {Entity, model, property} from '@loopback/repository';

@model({
  name: 'v_nomenclature_search',
})
export class NomenclatureSearch extends Entity {
  @property({
    type: 'number',
    id: true,
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
  })
  genus?: string;

  @property({
    type: 'string',
  })
  species?: string;

  @property({
    type: 'string',
    infraspecific: true,
  })
  subsp?: string;

  @property({
    type: 'string',
    infraspecific: true,
  })
  var?: string;

  @property({
    type: 'string',
    infraspecific: true,
  })
  subvar?: string;

  @property({
    type: 'string',
    infraspecific: true,
  })
  forma?: string;

  @property({
    type: 'string',
    infraspecific: true,
  })
  nothosubsp?: string;

  @property({
    type: 'string',
    infraspecific: true,
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
  })
  genusH?: string;

  @property({
    type: 'string',
    name: 'species_h',
  })
  speciesH?: string;

  @property({
    type: 'string',
    name: 'subsp_h',
    infraspecific: true,
  })
  subspH?: string;

  @property({
    type: 'string',
    name: 'var_h',
    infraspecific: true,
  })
  varH?: string;

  @property({
    type: 'string',
    name: 'subvar_h',
    infraspecific: true,
  })
  subvarH?: string;

  @property({
    type: 'string',
    name: 'forma_h',
    infraspecific: true,
  })
  formaH?: string;

  @property({
    type: 'string',
    name: 'nothosubsp_h',
    infraspecific: true,
  })
  nothosubspH?: string;

  @property({
    type: 'string',
    name: 'nothoforma_h',
    infraspecific: true,
  })
  nothoformaH?: string;

  @property({
    type: 'string',
    name: 'authors_h',
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

  @property({
    type: 'string',
    name: 'accepted_names',
  })
  acceptedNames?: string;

  constructor(data?: Partial<NomenclatureSearch>) {
    super(data);
  }
}

export interface NomenclatureSearchRelations {
  // describe navigational properties here
}

export type NomenclatureSearchWithRelations = NomenclatureSearch & NomenclatureSearchRelations;
