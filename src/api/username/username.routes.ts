import express from 'express';
import { Express } from 'express-serve-static-core';
import { UsernameController } from './username.controller';

const router = express.Router();
const username = new UsernameController();

export default function userRoutes(app: Express) {
  router.get('/login', username.login);
  router.post('/', username.create);
  router.get('/', username.findAll);
  router.get('/:id', username.findOne);
  router.put('/:id', username.update)
  router.delete('/:id', username.delete);

  app.use('/username', router);
};