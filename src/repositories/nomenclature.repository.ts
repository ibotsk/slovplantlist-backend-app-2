import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SlovplantlistDataSource} from '../datasources';
import {Nomenclature, NomenclatureRelations} from '../models';

export class NomenclatureRepository extends DefaultCrudRepository<
  Nomenclature,
  typeof Nomenclature.prototype.id,
  NomenclatureRelations
> {
  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
  ) {
    super(Nomenclature, dataSource);
  }
}
