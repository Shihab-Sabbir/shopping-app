export interface IItem {
  id: string;
  name: string;
  created_at: Date;
  created_by: string;
}

export interface IItemResponse {
  data?: IItem | IItem[];
}
