import express from 'express';
import { ItemController } from './item.controller';
import validateRequest from '../../middlewares/validateRequest';
import {
  createItemValidation,
  updateItemIdValidation,
} from './item.validation';
import auth from '../../middlewares/auth';

const ItemRoutes = express.Router();

ItemRoutes.get('/', auth(), ItemController.getAllItems);
ItemRoutes.get('/:id', auth(), ItemController.getItemById);
ItemRoutes.post(
  '/',
  auth(),
  validateRequest(createItemValidation),
  ItemController.createItem
);
ItemRoutes.put(
  '/:id',
  auth(),
  validateRequest(updateItemIdValidation),
  ItemController.updateItem
);
ItemRoutes.delete('/', auth(), ItemController.deleteItem);

export default ItemRoutes;
