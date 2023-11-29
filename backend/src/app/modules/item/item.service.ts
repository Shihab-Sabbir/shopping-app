import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IItem, IItemResponse } from './item.interface';
import { Item } from './item.model';

const getAllItems = async (
  userEmail: string,
  pickResult: any,
  limit: any
): Promise<{ items: IItemResponse; count: number }> => {
  const query = { created_by: userEmail, ...pickResult };

  const items = await Item.find(query)
    .limit(limit)
    .sort({
      created_at: -1,
    })
    .lean();

  items.forEach((item: { created_at: string | number | Date }) => {
    item.created_at = new Date(item.created_at);
  });

  const count = await Item.countDocuments(query);

  return { items, count };
};

const getItemById = async (
  itemId: string,
  userEmail: string
): Promise<IItemResponse> => {
  const item = await Item.findOne({ _id: itemId, created_by: userEmail });
  if (!item) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  return item;
};

const createItem = async (
  itemData: IItem,
  userEmail: string
): Promise<IItemResponse> => {
  const newItem = await Item.create({ ...itemData, created_by: userEmail });
  return newItem;
};

const updateItem = async (
  itemId: string,
  itemData: IItem,
  userEmail: string
): Promise<IItemResponse> => {
  const updatedItem = await Item.findOneAndUpdate(
    { id: itemId, created_by: userEmail },
    itemData,
    { new: true }
  );

  return updatedItem;
};

const deleteItem = async (
  itemId: string,
  userEmail: string
): Promise<IItemResponse> => {
  const deletedItem = await Item.findOneAndDelete({
    id: itemId,
    created_by: userEmail,
  });

  if (!deletedItem) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Item not found');
  }
  return deletedItem;
};

export const ItemService = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
