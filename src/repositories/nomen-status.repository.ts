import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SlovplantlistDataSource} from '../datasources';
import {NomenStatus, NomenStatusRelations} from '../models';

export class NomenStatusRepository extends DefaultCrudRepository<
  NomenStatus,
  typeof NomenStatus.prototype.id,
  NomenStatusRelations
> {
  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
  ) {
    super(NomenStatus, dataSource);
  }
}
