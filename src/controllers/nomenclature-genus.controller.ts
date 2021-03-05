import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Nomenclature,
  Genus,
} from '../models';
import {NomenclatureRepository} from '../repositories';

export class NomenclatureGenusController {
  constructor(
    @repository(NomenclatureRepository)
    public nomenclatureRepository: NomenclatureRepository,
  ) { }

  @get('/nomenclatures/{id}/genus', {
    responses: {
      '200': {
        description: 'Genus belonging to Nomenclature',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Genus)},
          },
        },
      },
    },
  })
  async getGenus(
    @param.path.number('id') id: typeof Nomenclature.prototype.id,
  ): Promise<Genus> {
    return this.nomenclatureRepository.genusReference(id);
  }
}
