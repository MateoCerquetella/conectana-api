import express from 'express';
import { Express } from 'express-serve-static-core';
import { ColaboratorController } from './colaborator.controller';

const router = express.Router();
const colaborator = new ColaboratorController();

export default function userRoutes(app: Express) {
  router.post('/', colaborator.create);
  router.get('/', colaborator.findAll);
  router.get('/:id', colaborator.findOne);
  router.put('/:id', colaborator.update)
  router.delete('/:id', colaborator.delete);

  app.use('/colaborator', router);
};