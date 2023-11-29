export interface IData {
  search: string | null;
  filters: string | null;
}

export interface MongoDBQuery {
  $or?: Array<Record<string, any>>;
  $and?: Array<Record<string, any>>;
}

const pick = (data: IData): MongoDBQuery => {
  const query: MongoDBQuery = {};

  if (data.search && data.search.trim() !== '') {
    query.$or = [
      { name: { $regex: data.search, $options: 'i' } },
      { id: { $regex: data.search, $options: 'i' } },
      { created_at: { $regex: data.search, $options: 'i' } },
      { created_by: { $regex: data.search, $options: 'i' } },
    ];
  }

  if (data.filters && data.filters.trim() !== '') {
    const filterValue = data.filters.trim();
    const filterConditions: Array<Record<string, any>> = [
      { name: filterValue },
      { id: filterValue },
      { created_at: filterValue },
      { created_by: filterValue },
    ];

    if (query.$or) {
      query.$and = [{ $or: query.$or }, { $or: filterConditions }];
    } else {
      query.$or = filterConditions;
    }
  }

  return query;
};

export default pick;
