import express from 'express';
import authRoutes from '../app/modules/auth/auth.route';
import ItemRoutes from '../app/modules/item/item.route';
import auth from '../app/middlewares/auth';

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/item',
    route: ItemRoutes,
  },
];

defaultRoutes.forEach(route => {
  if (route.path === '/auth') {
    router.use(route.path, route.route);
  } else {
    router.use(route.path, auth(), route.route);
  }
});

export default router;
