import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SlovplantlistDataSource} from '../datasources';
import {FamilyApg, FamilyApgRelations} from '../models';

export class FamilyApgRepository extends DefaultCrudRepository<
  FamilyApg,
  typeof FamilyApg.prototype.id,
  FamilyApgRelations
> {
  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
  ) {
    super(FamilyApg, dataSource);
  }
}
