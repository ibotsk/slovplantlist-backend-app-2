import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SlovplantlistDataSource} from '../datasources';
import {NomenclatureSearch, NomenclatureSearchRelations} from '../models';

export class NomenclatureSearchRepository extends DefaultCrudRepository<
  NomenclatureSearch,
  typeof NomenclatureSearch.prototype.id,
  NomenclatureSearchRelations
> {
  constructor(
    @inject('datasources.slovplantlist') dataSource: SlovplantlistDataSource,
  ) {
    super(NomenclatureSearch, dataSource);
  }
}
