import { PropertyDefinition } from '@loopback/repository';
import { Nomenclature, NomenclatureSearch } from '../../models';

type Property = {
  [name: string]: PropertyDefinition;
};

const nomenclatureSearchProperties = NomenclatureSearch.definition.properties;
const nomenclatureProperties = Nomenclature.definition.properties;

const getSearchDefaultOrder = (properties: Property) => {
  const searchDefaultOrder = Object.keys(
    properties,
  ).filter((key) => properties[key].defaultOrder);

  searchDefaultOrder.sort((a, b) => (
    properties[a].defaultOrder
      > properties[b].defaultOrder
      ? 1 : -1
  ));
  return searchDefaultOrder;
}

export function getNomenclatureSearchDefaultOrder() {
  return getSearchDefaultOrder(nomenclatureSearchProperties);
}

export function getNomenclatureDefaultOrder() {
  return getSearchDefaultOrder(nomenclatureProperties);
}
