import express from 'express';
import { Express } from 'express-serve-static-core';
import { CategoryController } from './category.controller';

const router = express.Router();
const category = new CategoryController();

export default function categoryRoutes(app: Express) {
  router.post('/', category.create);
  router.get('/', category.findAll);
  router.get('/:id', category.findOne);
  router.put('/:id', category.update)
  router.delete('/:id', category.delete);

  app.use('/category', router);
};