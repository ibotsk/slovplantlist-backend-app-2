import {FilterBuilder, WhereBuilder} from '@loopback/filter';
import {
  repository,
} from '@loopback/repository';
import {
  getModelSchemaRef, post,
  requestBody,
  response
} from '@loopback/rest';
import {NomenclatureSearch} from '../models';
import {NomenclatureSearchRepository} from '../repositories';
import {
  NomenclatureSearchScientificRequest,
  NomenclatureSearchResponse,
} from './domain/nomenclature-search.domain';

const nomenclatureSearchProperties = NomenclatureSearch.definition.properties;
const searchInfraspecificFields = Object.keys(
  nomenclatureSearchProperties,
).filter((key) => nomenclatureSearchProperties[key].infraspecific);
const searchDefaultOrder = Object.keys(
  nomenclatureSearchProperties,
).filter((key) => nomenclatureSearchProperties[key].defaultOrder);

searchDefaultOrder.sort((a, b) => (
  nomenclatureSearchProperties[a].defaultOrder
  > nomenclatureSearchProperties[b].defaultOrder
  ? 1 : -1
));

export class NomenclatureSearchController {
  constructor(
    @repository(NomenclatureSearchRepository)
    public nomenclatureSearchRepository: NomenclatureSearchRepository,
  ) { }

  @post('/nomenclature-search/scientific')
  @response(200, {
    description: 'Array of NomenclatureSearch model instances',
    content: {
      'application/json': {
        schema: {
          type: 'object',
          required: ['data', 'totalRecords'],
          properties: {
            data: {
              type: 'array',
              items: getModelSchemaRef(NomenclatureSearch, { includeRelations: true }),
            },
            totalRecord: { type: 'integer' },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'integer' },
                rowsPerPage: { type: 'integer' },
                totalPages: { type: 'integer' },
              }
            }
          }
          
        },
      },
    },
  })
  async searchScientific(
    @requestBody({
      required: true,
      content: {
        'application/json': {
          schema: {
            allOf: [
              {
                type: 'object',
                properties: {
                  page: {
                    type: 'integer',
                    minimum: 1,
                  },
                  rowsPerPage: {
                    type: 'integer',
                    minimum: 1,
                  },
                },
              },
              {
                type: 'object',
                anyOf: [
                  {
                    type: 'object',
                    required: ['genus'],
                    properties: {
                      genus: {
                        type: 'string',
                        minLength: 1,
                      },
                    }
                  },
                  {
                    type: 'object',
                    required: ['species'],
                    properties: {
                      species: {
                        type: 'string',
                        minLength: 1,
                      },
                    }
                  },
                  {
                    type: 'object',
                    required: ['infraspecific'],
                    properties: {
                      infraspecific: {
                        type: 'string',
                        minLength: 1,
                      },
                    }
                  },
                  {
                    type: 'object',
                    required: ['status'],
                    properties: {
                      status: {
                        type: 'string',
                        minLength: 1,
                      },
                    }
                  }
                ],
              },
            ],
          },
        },
      },
    })
    searchRequest: NomenclatureSearchScientificRequest,
  ): Promise<NomenclatureSearchResponse> {
    const {
      genus, species, infraspecific, status,
      page = 1, rowsPerPage,
    } = searchRequest;

    const ands = [];
    if (genus) {
      ands.push({genus: {like: `%${genus}%`}});
    }
    if (species) {
      const speciesOr = {
        or: [
          {species: {like: `%${species}%`}},
          {speciesH: {like: `%${species}%`}},
        ],
      };
      ands.push(speciesOr);
    }
    if (infraspecific) {
      const infraOrs = searchInfraspecificFields.map((field) => ({
        [field]: {like: `%${infraspecific}%`},
      }));
      ands.push({or: infraOrs});
    }
    if (status) {
      ands.push({status});
    }

    const wb = new WhereBuilder<NomenclatureSearch>();
    const where = wb.and(ands).build();
    const fb = new FilterBuilder<NomenclatureSearch>();
    fb.where(where);

    if (rowsPerPage) {
      fb.offset((page - 1) * rowsPerPage).limit(rowsPerPage);
    }

    const filter = fb
      .include('acceptedNames')
      .order(searchDefaultOrder)
      .build();

    const data = await this.nomenclatureSearchRepository.find(filter);
    const countResult = await this.nomenclatureSearchRepository.count(where);
    const totalCount = countResult.count;

    const totalPages = rowsPerPage ? Math.ceil(totalCount / rowsPerPage) : 1;

    return {
      data,
      totalRecords: totalCount,
      pagination: {
        page,
        rowsPerPage,
        totalPages,
      },
    };
  }

}
