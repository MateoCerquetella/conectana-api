import express from 'express';
import { Express } from 'express-serve-static-core';
import { ensureAuthenticated } from '../middleware/auth';
import { ColaboratorController } from './colaborator.controller';

const router = express.Router();
const colaborator = new ColaboratorController();

export default function colaboratorRoutes(app: Express) {
  router.post('/', colaborator.create);
  router.get('/', colaborator.findAll);
  router.get('/:id', colaborator.findOne);
  router.put('/:id', ensureAuthenticated, colaborator.update)
  router.delete('/:id', ensureAuthenticated, colaborator.delete);

  app.use('/colaborator', router);
};