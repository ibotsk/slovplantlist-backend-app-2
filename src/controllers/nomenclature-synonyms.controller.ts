import {
  repository,
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
} from '@loopback/rest';
import { FilterBuilder, WhereBuilder } from '@loopback/filter';
import { Synonyms } from '../models';
import { NomenclatureRepository } from '../repositories';
import {
  NomenclatureSynonymsResponse,
} from './domain/nomenclature-synonyms.domain';

const whereSyntype = (syntype: number) => (
  (new WhereBuilder<Synonyms>()).eq('syntype', syntype).build()
);

const fetchSynonyms = async (
  repo: NomenclatureRepository, id: number, syntype: number,
  withSubsynonyms = false,
) => {
  const includeFilter = {
    relation: 'synonym',
    scope: {},
  };
  if (withSubsynonyms) {
    includeFilter.scope = {
      include: ['subsynonymsNomenclatoric'], // TODO: subsynonymsNomenclatoric include all synonyms, not just of type 3
    }
  }

  const fb = new FilterBuilder<Synonyms>();
  const filter = fb
    .include(includeFilter)
    .where(whereSyntype(syntype))
    .build();

  return repo.synonyms(id).find(filter);
}

export class NomenclatureSynonymsController {
  constructor(
    @repository(NomenclatureRepository) protected nomenclatureRepository: NomenclatureRepository,
  ) { }

  @get('/names/{id}/synonyms', {
    responses: {
      '200': {
        description: 'Nomenclatoric, taxonomic and other synonyms',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              required: [
                'nomenclatoricSynonyms',
                'taxonomicSynonyms',
                'otherSynonyms',
              ],
              properties: {
                nomenclatoricSynonyms: { type: 'array', items: getModelSchemaRef(Synonyms) },
                taxonomicSynonyms: { type: 'array', items: getModelSchemaRef(Synonyms) },
                otherSynonyms: { type: 'array', items: getModelSchemaRef(Synonyms) },
              }
            },
          },
        },
      },
    },
  })
  async findSynonyms(
    @param.path.number('id') id: number,
    @param.query.boolean('withSubsynonyms') withSubsynonyms = false,
  ): Promise<NomenclatureSynonymsResponse> {

    const nomenclatoricSynonyms = await fetchSynonyms(
      this.nomenclatureRepository, id, 3,
    );

    const taxonomicSynonyms = await fetchSynonyms(
      this.nomenclatureRepository, id, 2, withSubsynonyms,
    );
    const otherSynonyms = await fetchSynonyms(
      this.nomenclatureRepository, id, 0,
    );

    return {
      nomenclatoricSynonyms,
      taxonomicSynonyms,
      otherSynonyms,
    };
  }

  @get('/names/{id}/invalid-designations', {
    responses: {
      '200': {
        description: 'Invalid designations',
        content: {
          'application/json': {
            schema:
              { type: 'array', items: getModelSchemaRef(Synonyms) }
          },
        },
      },
    },
  })
  async findInvalidDesignation(
    @param.path.number('id') id: number,
  ): Promise<Synonyms[]> {
    return fetchSynonyms(
      this.nomenclatureRepository, id, 1,
    );
  }

  @get('/names/{id}/misidentifications', {
    responses: {
      '200': {
        description: 'Misidentifications',
        content: {
          'application/json': {
            schema:
              { type: 'array', items: getModelSchemaRef(Synonyms) }
          },
        },
      },
    },
  })
  async findMisidentifications(
    @param.path.number('id') id: number,
  ): Promise<Synonyms[]> {
    return fetchSynonyms(
      this.nomenclatureRepository, id, 4,
    );
  }

}
