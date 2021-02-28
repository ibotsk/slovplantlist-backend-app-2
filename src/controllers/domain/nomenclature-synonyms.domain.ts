import { Synonyms } from '../../models';

export interface NomenclatureSynonymsResponse {
  nomenclatoricSynonyms: Synonyms[];
  taxonomicSynonyms: Synonyms[];
  invalidDesignations: Synonyms[];
  misidentifications: Synonyms[];
  otherSynonyms: Synonyms[];
}
