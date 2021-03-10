import {
  EntityNotFoundError,
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
  response,
} from '@loopback/rest';
import { FilterBuilder } from '@loopback/filter';

import { Nomenclature } from '../models';
import { NomenclatureRepository } from '../repositories';
import { NomenclatureForRelationsResponse } from './domain/nomenclature.domain';

import { getNomenclatureDefaultOrder } from './helpers';

export class NomenclatureController {
  constructor(
    @repository(NomenclatureRepository)
    public nomenclatureRepository: NomenclatureRepository,
  ) { }

  @get('/nomenclatures/{id}')
  @response(200, {
    description: 'Nomenclature model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Nomenclature, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Nomenclature> {

    const fb = new FilterBuilder<Nomenclature>();
    const filter = fb
      .include('acceptedNames')
      .include('genusReference')
      .include('basionym')
      .include('nomenNovum')
      .include('replaced')
      .include('parentCombination')
      .include('taxonPosition')
      .build();
    
    const result = await this.nomenclatureRepository.findById(id, filter);

    if (!result.checkedTimestamp) {
      throw new EntityNotFoundError('nomenclature', id);
    }
    return result;
  }

  @get('/nomenclatures/{id}/for-relations', {
    responses: {
      '200': {
        description: 'Names for which this name is a: basionym, nomen novum, replaced name, parent combination, taxon position',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'basionymFor', 'nomenNovumFor', 'replacedFor',
                'parentCombinationFor', 'taxonPositionFor',
              ],
              properties: {
                basionymFor: { type: 'array', items: getModelSchemaRef(Nomenclature) },
                nomenNovumFor: { type: 'array', items: getModelSchemaRef(Nomenclature) },
                replacedFor: { type: 'array', items: getModelSchemaRef(Nomenclature) },
                parentCombinationFor: { type: 'array', items: getModelSchemaRef(Nomenclature) },
                taxonPositionFor: { type: 'array', items: getModelSchemaRef(Nomenclature) },
              },
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
  ): Promise<NomenclatureForRelationsResponse> {
    const fb = new FilterBuilder<Nomenclature>();
    const filter = fb.order(getNomenclatureDefaultOrder()).build();
  
    const basionymFor = await this.nomenclatureRepository.basionymFor(id).find(filter);
    const nomenNovumFor = await this.nomenclatureRepository.nomenNovumFor(id).find(filter);
    const replacedFor = await this.nomenclatureRepository.replacedFor(id).find(filter);
    const parentCombinationFor = await this.nomenclatureRepository.parentCombinationFor(id).find(filter);
    const taxonPositionFor = await this.nomenclatureRepository.taxonPositionFor(id).find(filter);

    return {
      basionymFor,
      nomenNovumFor,
      replacedFor,
      parentCombinationFor,
      taxonPositionFor,
    };
  }

}
