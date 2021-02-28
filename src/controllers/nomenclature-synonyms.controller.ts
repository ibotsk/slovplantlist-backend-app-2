import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import { FilterBuilder, WhereBuilder } from '@loopback/filter';
import {
  Nomenclature,
  Synonyms,
} from '../models';
import { NomenclatureRepository } from '../repositories';
import {
  NomenclatureSynonymsResponse,
} from './domain/nomenclature-synonyms.domain';

const whereSyntype = (syntype: number) => (
  (new WhereBuilder<Synonyms>()).eq('syntype', syntype).build()
);

const fetchSynonyms = async (
  repo: NomenclatureRepository, id: number, syntype: number,
) => {
  const fb = new FilterBuilder<Synonyms>();
  const filter = fb.include('synonym').where(whereSyntype(syntype)).build();

  return repo.synonyms(id).find(filter);
}

export class NomenclatureSynonymsController {
  constructor(
    @repository(NomenclatureRepository) protected nomenclatureRepository: NomenclatureRepository,
  ) { }

  @get('/nomenclatures/{id}/synonyms', {
    responses: {
      '200': {
        description: 'Array of Nomenclature has many Synonyms',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'nomenclatoricSynonyms',
                'taxonomicSynonyms',
                'invalidDesignations',
                'misidentifications',
                'otherSynonyms',
              ],
              properties: {
                nomenclatoricSynonyms: { type: 'array', items: getModelSchemaRef(Nomenclature) },
                taxonomicSynonyms: { type: 'array', items: getModelSchemaRef(Nomenclature) },
                invalidDesignations: { type: 'array', items: getModelSchemaRef(Nomenclature) },
                misidentifications: { type: 'array', items: getModelSchemaRef(Nomenclature) },
                otherSynonyms: { type: 'array', items: getModelSchemaRef(Nomenclature) },
              }
            },
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
  ): Promise<NomenclatureSynonymsResponse> {

    const nomenclatoricSynonyms = await fetchSynonyms(
      this.nomenclatureRepository, id, 3,
    );
    const taxonomicSynonyms = await fetchSynonyms(
      this.nomenclatureRepository, id, 2,
    );
    const invalidDesignations = await fetchSynonyms(
      this.nomenclatureRepository, id, 1,
    );
    const misidentifications = await fetchSynonyms(
      this.nomenclatureRepository, id, 4,
    );
    const otherSynonyms = await fetchSynonyms(
      this.nomenclatureRepository, id, 0,
    );

    return {
      nomenclatoricSynonyms,
      taxonomicSynonyms,
      invalidDesignations,
      misidentifications,
      otherSynonyms,
    };
  }

}
