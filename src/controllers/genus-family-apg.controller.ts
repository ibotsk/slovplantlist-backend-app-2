import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Genus,
  FamilyApg,
} from '../models';
import {GenusRepository} from '../repositories';

export class GenusFamilyApgController {
  constructor(
    @repository(GenusRepository)
    public genusRepository: GenusRepository,
  ) { }

  @get('/genera/{id}/family-apg', {
    responses: {
      '200': {
        description: 'FamilyApg belonging to Genus',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(FamilyApg)},
          },
        },
      },
    },
  })
  async getFamilyApg(
    @param.path.number('id') id: typeof Genus.prototype.id,
  ): Promise<FamilyApg> {
    return this.genusRepository.family(id);
  }
}
