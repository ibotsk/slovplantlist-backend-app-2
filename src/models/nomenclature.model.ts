import {
  Entity, model, property, belongsTo, hasMany,
} from '@loopback/repository';
import { Genus } from './genus.model';
import { Synonyms } from './synonyms.model';

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

  //----- realational properties ----- //
  @belongsTo(() => Genus, { name: 'genusReference' }, {
    name: 'id_genus',
    hidden: true,
  })
  idGenus?: number;

  @belongsTo(() => Nomenclature, { name: 'basionym' }, {
    name: 'id_basionym',
    hidden: true,
  })
  idBasionym: number;

  @belongsTo(() => Nomenclature, { name: 'nomenNovum' }, {
    name: 'id_nomen_novum',
    hidden: true,
  })
  idNomenNovum?: number;

  @belongsTo(() => Nomenclature, { name: 'replaced' }, {
    name: 'id_replaced',
    hidden: true,
  })
  idReplaced?: number;

  @belongsTo(() => Nomenclature, { name: 'parentCombination' }, {
    name: 'id_parent_combination',
    hidden: true,
  })
  idParentCombination?: number;

  @belongsTo(() => Nomenclature, { name: 'taxonPosition' }, {
    name: 'id_taxon_position',
    hidden: true,
  })
  idTaxonPosition?: number;

  @hasMany(() => Nomenclature, {
    through: {
      model: () => Synonyms,
      keyFrom: 'idSynonym',
      keyTo: 'idParent',
    },
  })
  acceptedNames: Nomenclature[];

  constructor(data?: Partial<Nomenclature>) {
    super(data);
  }
}

export interface NomenclatureRelations {
  // describe navigational properties here
}

export type NomenclatureWithRelations = Nomenclature & NomenclatureRelations;
