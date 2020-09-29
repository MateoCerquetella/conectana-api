import express from 'express';
import { Express } from 'express-serve-static-core';
import { TagController } from './tag.controller';
import { ensureAuthenticated } from '../middleware/auth';


const router = express.Router();
const tag = new TagController();

export default function tagRoutes(app: Express) {
  router.post('/', ensureAuthenticated, tag.create);
  router.get('/', tag.findAll);
  router.get('/:id', tag.findOne);
  router.put('/:id', tag.update)
  router.delete('/:id', tag.delete);

  app.use('/tag', router);
};