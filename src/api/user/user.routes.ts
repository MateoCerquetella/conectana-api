import express from 'express';
import { UserController } from './user.controller';
let router = express.Router();
const userController = new UserController();

export function userRoutes(app) {
  router.get('/', userController.login);
  app.use('/user', router);
};