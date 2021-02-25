import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SlovplantlistDataSource} from '../datasources';
import {Genus, GenusRelations} from '../models';

export class GenusRepository extends DefaultCrudRepository<
  Genus,
  typeof Genus.prototype.id,
  GenusRelations
> {
  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
  ) {
    super(Genus, dataSource);
  }
}
