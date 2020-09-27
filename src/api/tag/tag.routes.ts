import express from 'express';
import { Express } from 'express-serve-static-core';
import { TagController } from './tag.controller';

const router = express.Router();
const tag = new TagController();

export default function tagRoutes(app: Express) {
  router.post('/', tag.create);
  router.get('/', tag.findAll);
  router.get('/:id', tag.findOne);
  router.put('/:id', tag.update)
  router.delete('/:id', tag.delete);

  app.use('/tag', router);
};