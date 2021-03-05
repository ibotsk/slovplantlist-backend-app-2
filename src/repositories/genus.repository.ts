import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {SlovplantlistDataSource} from '../datasources';
import {Genus, GenusRelations, FamilyApg} from '../models';
import {FamilyApgRepository} from './family-apg.repository';

export class GenusRepository extends DefaultCrudRepository<
  Genus,
  typeof Genus.prototype.id,
  GenusRelations
> {

  public readonly family: BelongsToAccessor<FamilyApg, typeof Genus.prototype.id>;

  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource, @repository.getter('FamilyApgRepository') protected familyApgRepositoryGetter: Getter<FamilyApgRepository>,
  ) {
    super(Genus, dataSource);
    this.family = this.createBelongsToAccessorFor('family', familyApgRepositoryGetter,);
    this.registerInclusionResolver('family', this.family.inclusionResolver);
  }
}
