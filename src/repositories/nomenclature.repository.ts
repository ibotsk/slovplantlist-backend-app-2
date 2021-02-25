import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SlovplantlistDataSource} from '../datasources';
import {Nomenclature, NomenclatureRelations, Genus} from '../models';
import {GenusRepository} from './genus.repository';

export class NomenclatureRepository extends DefaultCrudRepository<
  Nomenclature,
  typeof Nomenclature.prototype.id,
  NomenclatureRelations
> {

  public readonly genusReference: BelongsToAccessor<Genus, typeof Nomenclature.prototype.id>;

  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource, @repository.getter('GenusRepository') protected genusRepositoryGetter: Getter<GenusRepository>,
  ) {
    super(Nomenclature, dataSource);
    this.genusReference = this.createBelongsToAccessorFor('genusReference', genusRepositoryGetter,);
    this.registerInclusionResolver('genusReference', this.genusReference.inclusionResolver);
  }
}
