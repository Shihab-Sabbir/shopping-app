import { RequestHandler } from 'express';
import sendResponse from '../../../shared/utils/sendResponse';
import { IItem, IItemResponse } from './item.interface';
import { ItemService } from './item.service';
import pick, { IData } from '../../../shared/utils/pick';

const getAllItems: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const userEmail = req.user!.email;
    const { limit, ...searchAndFilter } = req.query;
    const pickResult = pick(searchAndFilter as unknown as IData);
    console.log({ pickResult });
    const result = await ItemService.getAllItems(userEmail, pickResult, limit);

    sendResponse<IItemResponse>(res, {
      success: true,
      statusCode: 200,
      data: result.items,
      meta: {
        total: result.count,
      },
      message: 'Items retrieved successfully!',
    });
  } catch (error) {
    next(error);
  }
};

const getItemById: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const itemId: string = req.query.id as string;
    const userEmail = req.user!.email;
    const result = await ItemService.getItemById(itemId, userEmail);
    sendResponse<IItemResponse>(res, {
      success: true,
      statusCode: 200,
      data: result,
      message: 'Item retrieved successfully!',
    });
  } catch (error) {
    next(error);
  }
};

const createItem: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const itemData: IItem = req.body;
    const userEmail = req.user!.email;
    const result = await ItemService.createItem(itemData, userEmail);

    sendResponse<IItemResponse>(res, {
      success: true,
      statusCode: 200,
      data: result,
      message: 'Item created successfully!',
    });
  } catch (error) {
    next(error);
  }
};

const updateItem: RequestHandler = async (req, res, next): Promise<void> => {
  console.log('hitted update !');
  try {
    const itemId = req.params.id as string;
    const itemData: IItem = req.body;
    const userEmail = req.user!.email;
    const result = await ItemService.updateItem(itemId, itemData, userEmail);

    sendResponse<IItemResponse>(res, {
      success: true,
      statusCode: 200,
      data: result,
      message: 'Item updated successfully!',
    });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

const deleteItem: RequestHandler = async (req, res, next): Promise<void> => {
  try {
    const itemId: string = req.query.id as string;
    console.log({ itemId });
    const userEmail = req.user!.email;
    const result = await ItemService.deleteItem(itemId, userEmail);
    sendResponse<IItemResponse>(res, {
      success: true,
      statusCode: 200,
      data: result,
      message: 'Item deleted successfully!',
    });
  } catch (error) {
    next(error);
  }
};

export const ItemController = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
};
