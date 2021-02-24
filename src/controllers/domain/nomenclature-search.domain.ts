import { NomenclatureSearch } from '../../models';

export interface NomenclatureSearchScientificRequest {
  genus?: string;
  species?: string;
  infraspecific?: string;
  status?: string[];
  page?: number;
  rowsPerPage?: number;
}

export interface NomenclatureSearchResponse {
  data: NomenclatureSearch[];
  totalRecords: number;
  pagination: {
    page?: number,
    rowsPerPage?: number,
    totalPages: number,
  };
}
