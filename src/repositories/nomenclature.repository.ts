import { inject, Getter } from '@loopback/core';
import { DefaultCrudRepository, repository, BelongsToAccessor } from '@loopback/repository';
import { SlovplantlistDataSource } from '../datasources';
import { Nomenclature, NomenclatureRelations, Genus } from '../models';
import { GenusRepository } from './genus.repository';

export class NomenclatureRepository extends DefaultCrudRepository<
  Nomenclature,
  typeof Nomenclature.prototype.id,
  NomenclatureRelations
  > {

  public readonly genusReference: BelongsToAccessor<Genus, typeof Nomenclature.prototype.id>;

  public readonly basionym: BelongsToAccessor<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly nomenNovum: BelongsToAccessor<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly replaced: BelongsToAccessor<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly parentCombination: BelongsToAccessor<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly taxonPosition: BelongsToAccessor<Nomenclature, typeof Nomenclature.prototype.id>;

  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
    @repository.getter('GenusRepository') protected genusRepositoryGetter: Getter<GenusRepository>,
  ) {
    super(Nomenclature, dataSource);
    this.genusReference = this.createBelongsToAccessorFor('genusReference', genusRepositoryGetter,);
    this.registerInclusionResolver('genusReference', this.genusReference.inclusionResolver);

    this.basionym = this.createBelongsToAccessorFor('basionym', Getter.fromValue(this));
    this.registerInclusionResolver('basionym', this.basionym.inclusionResolver);

    this.nomenNovum = this.createBelongsToAccessorFor('nomenNovum', Getter.fromValue(this));
    this.registerInclusionResolver('nomenNovum', this.nomenNovum.inclusionResolver);

    this.replaced = this.createBelongsToAccessorFor('replaced', Getter.fromValue(this));
    this.registerInclusionResolver('replaced', this.replaced.inclusionResolver);

    this.parentCombination = this.createBelongsToAccessorFor('parentCombination', Getter.fromValue(this));
    this.registerInclusionResolver('parentCombination', this.parentCombination.inclusionResolver);

    this.taxonPosition = this.createBelongsToAccessorFor('taxonPosition', Getter.fromValue(this));
    this.registerInclusionResolver('taxonPosition', this.taxonPosition.inclusionResolver);
  }
}
