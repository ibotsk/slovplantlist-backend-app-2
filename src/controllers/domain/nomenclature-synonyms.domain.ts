import { Synonyms } from '../../models';

export interface NomenclatureSynonymsResponse {
  nomenclatoricSynonyms: Synonyms[];
  taxonomicSynonyms: Synonyms[];
  otherSynonyms: Synonyms[];
}
