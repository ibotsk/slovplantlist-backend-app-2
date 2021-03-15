import { inject, Getter } from '@loopback/core';
import {
  DefaultCrudRepository, repository,
  BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import { SlovplantlistDataSource } from '../datasources';
import {
  Nomenclature, NomenclatureRelations, Genus, Synonyms, NomenStatus} from '../models';
import { GenusRepository } from './genus.repository';
import {
  SynonymsRepository,
  SynonymsOfSynonymsRepository,
} from './synonyms.repository';
import {NomenStatusRepository} from './nomen-status.repository';

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

  public readonly acceptedNames: HasManyThroughRepositoryFactory<
    Nomenclature, typeof Nomenclature.prototype.id,
    Synonyms, typeof Nomenclature.prototype.id
  >;

  public readonly synonyms: HasManyRepositoryFactory<Synonyms, typeof Nomenclature.prototype.id>;

  public readonly basionymFor: HasManyRepositoryFactory<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly nomenNovumFor: HasManyRepositoryFactory<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly replacedFor: HasManyRepositoryFactory<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly parentCombinationFor: HasManyRepositoryFactory<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly taxonPositionFor: HasManyRepositoryFactory<Nomenclature, typeof Nomenclature.prototype.id>;

  public readonly nomenStatus: HasOneRepositoryFactory<NomenStatus, typeof Nomenclature.prototype.id>;

  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
    @repository.getter('GenusRepository') protected genusRepositoryGetter: Getter<GenusRepository>,
    @repository.getter('SynonymsRepository') protected synonymsRepositoryGetter: Getter<SynonymsRepository>,
    @repository.getter('NomenStatusRepository') protected nomenStatusRepositoryGetter: Getter<NomenStatusRepository>,
  ) {
    super(Nomenclature, dataSource);
    this.genusReference = this.createBelongsToAccessorFor('genusReference', genusRepositoryGetter);
    this.registerInclusionResolver('genusReference', this.genusReference.inclusionResolver);

    this.synonyms = this.createHasManyRepositoryFactoryFor('synonyms', synonymsRepositoryGetter);
    this.registerInclusionResolver('synonyms', this.synonyms.inclusionResolver);

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

    this.acceptedNames = this.createHasManyThroughRepositoryFactoryFor('acceptedNames', Getter.fromValue(this), synonymsRepositoryGetter);
    this.registerInclusionResolver('acceptedNames', this.acceptedNames.inclusionResolver);

    this.basionymFor = this.createHasManyRepositoryFactoryFor('basionymFor', Getter.fromValue(this));
    this.registerInclusionResolver('basionymFor', this.basionymFor.inclusionResolver);

    this.nomenNovumFor = this.createHasManyRepositoryFactoryFor('nomenNovumFor', Getter.fromValue(this));
    this.registerInclusionResolver('nomenNovumFor', this.nomenNovumFor.inclusionResolver);
    
    this.replacedFor = this.createHasManyRepositoryFactoryFor('replacedFor', Getter.fromValue(this));
    this.registerInclusionResolver('replacedFor', this.replacedFor.inclusionResolver);
    
    this.parentCombinationFor = this.createHasManyRepositoryFactoryFor('parentCombinationFor', Getter.fromValue(this));
    this.registerInclusionResolver('parentCombinationFor', this.parentCombinationFor.inclusionResolver);
    
    this.taxonPositionFor = this.createHasManyRepositoryFactoryFor('taxonPositionFor', Getter.fromValue(this));
    this.registerInclusionResolver('taxonPositionFor', this.taxonPositionFor.inclusionResolver);

    this.nomenStatus = this.createHasOneRepositoryFactoryFor('nomenStatus', nomenStatusRepositoryGetter);
    this.registerInclusionResolver('nomenStatus', this.nomenStatus.inclusionResolver);
  }
}

// used in synonyms relation to avoid circular dependency
export class NomenclatureAsSynonymRepository extends DefaultCrudRepository<
  Nomenclature,
  typeof Nomenclature.prototype.id,
  NomenclatureRelations
  > {

  public readonly subsynonymsNomenclatoric: HasManyThroughRepositoryFactory<Nomenclature, typeof Nomenclature.prototype.id,
  Synonyms,
  typeof Nomenclature.prototype.id
  >;

  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
    @repository.getter('SynonymsOfSynonymsRepository') protected synonymsOfSynonymsRepositoryGetter: Getter<SynonymsOfSynonymsRepository>,
  ) {
    super(Nomenclature, dataSource);

    this.subsynonymsNomenclatoric = this.createHasManyThroughRepositoryFactoryFor(
      'subsynonymsNomenclatoric', Getter.fromValue(this), synonymsOfSynonymsRepositoryGetter);
      this.registerInclusionResolver('subsynonymsNomenclatoric', this.subsynonymsNomenclatoric.inclusionResolver);
  }
}