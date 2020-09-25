import express from 'express';
import { Express } from 'express-serve-static-core';
import { UserController } from './user.controller';

const router = express.Router();
const user = new UserController();

export default function userRoutes(app: Express) {
  router.get('/login', user.login);
  router.post('/', user.create);
  router.get('/', user.findAll);
  router.get('/:id', user.findOne);
  router.put('/:id', user.update)
  router.delete('/:id', user.delete);

  app.use('/user', router);
};