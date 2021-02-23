import { inject, Getter } from '@loopback/core';
import {
  DefaultCrudRepository, repository,
  HasManyThroughRepositoryFactory,
} from '@loopback/repository';
import { SlovplantlistDataSource } from '../datasources';
import {
  Nomenclature, NomenclatureSearch, NomenclatureSearchRelations, Synonyms,
} from '../models';
import { NomenclatureRepository } from './nomenclature.repository';
import { SynonymsRepository } from './synonyms.repository';

export class NomenclatureSearchRepository extends DefaultCrudRepository<
  NomenclatureSearch,
  typeof NomenclatureSearch.prototype.id,
  NomenclatureSearchRelations
  > {
  public readonly acceptedNames: HasManyThroughRepositoryFactory<
    Nomenclature,
    typeof Nomenclature.prototype.id,
    Synonyms,
    typeof NomenclatureSearch.prototype.id
  >;

  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
    @repository.getter('NomenclatureRepository')
    nomenclatureRepositoryGetter: Getter<NomenclatureRepository>,
    @repository.getter('SynonymsRepository')
    synonymsRepositoryGetter: Getter<SynonymsRepository>
  ) {
    super(NomenclatureSearch, dataSource);

    this.acceptedNames = this.createHasManyThroughRepositoryFactoryFor(
      'acceptedNames',
      nomenclatureRepositoryGetter,
      synonymsRepositoryGetter,
    );

    this.registerInclusionResolver(
      'acceptedNames', this.acceptedNames.inclusionResolver,
    );
  }
}
