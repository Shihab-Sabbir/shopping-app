export interface IItemResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: IItem[] | [];
  meta?: {
    total?: unknown;
  };
}

export interface IFormData {
  id: string;
  name: string;
}

export interface IItemGetPayload {
  searchData: string | "";
  filterData: string | "";
  limit: number | string;
}

export interface IItem {
  id: string;
  name: string;
  created_at: Date;
  created_by: string;
}
