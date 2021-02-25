import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
  response,
} from '@loopback/rest';
import { FilterBuilder } from '@loopback/filter';

import {Nomenclature} from '../models';
import {NomenclatureRepository} from '../repositories';

export class NomenclatureController {
  constructor(
    @repository(NomenclatureRepository)
    public nomenclatureRepository : NomenclatureRepository,
  ) {}

  @get('/nomenclatures/{id}')
  @response(200, {
    description: 'Nomenclature model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Nomenclature, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
  ): Promise<Nomenclature> {
    const fb = new FilterBuilder<Nomenclature>();
    const filter = fb
      .include('genusReference')
      .include('basionym')
      .include('nomenNovum')
      .include('replaced')
      .include('parentCombination')
      .include('taxonPosition')
      .build();
    return this.nomenclatureRepository.findById(id, filter);
  }

}
