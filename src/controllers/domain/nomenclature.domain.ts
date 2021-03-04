import { Nomenclature } from '../../models';

export interface NomenclatureForRelationsResponse {
  basionymFor: Nomenclature[];
  nomenNovumFor: Nomenclature[];
  replacedFor: Nomenclature[];
  parentCombinationFor: Nomenclature[];
  taxonPositionFor: Nomenclature[];
}
