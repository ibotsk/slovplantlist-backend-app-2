import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { SlovplantlistDataSource } from '../datasources';
import { Synonyms, SynonymsRelations, Nomenclature } from '../models';
import { NomenclatureAsSynonymRepository } from './nomenclature.repository';

export class SynonymsRepository extends DefaultCrudRepository<
  Synonyms,
  typeof Synonyms.prototype.id,
  SynonymsRelations
  > {

  public readonly synonym: BelongsToAccessor<Nomenclature, typeof Synonyms.prototype.id>;

  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
    @repository.getter('NomenclatureAsSynonymRepository') protected nomenclatureAsSynonymRepositoryGetter: Getter<NomenclatureAsSynonymRepository>,
  ) {
    super(Synonyms, dataSource);
    this.synonym = this.createBelongsToAccessorFor('synonym', nomenclatureAsSynonymRepositoryGetter,);
    this.registerInclusionResolver('synonym', this.synonym.inclusionResolver);
  }
}

export class SynonymsOfSynonymsRepository extends DefaultCrudRepository<
  Synonyms,
  typeof Synonyms.prototype.id,
  SynonymsRelations
  > {

  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
  ) {
    super(Synonyms, dataSource);
  }
}