import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {SlovplantlistDataSource} from '../datasources';
import {Synonyms, SynonymsRelations} from '../models';

export class SynonymsRepository extends DefaultCrudRepository<
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
