import express, { RequestHandler } from 'express'
import { isAuthAdmin } from '../middleware/auth'
import { UserController } from './user.controller'

const router = express.Router()
const user = new UserController()

export default function usernameRoutes(app: express.Express) {
  router.post('/login', user.login as RequestHandler)
  router.post('/', user.create as RequestHandler)
  router.get('/', isAuthAdmin, user.findAll as RequestHandler)
  router.get('/:id', isAuthAdmin, user.findOne as RequestHandler)
  router.put('/:id', user.update as RequestHandler)
  router.delete('/:id', user.delete as RequestHandler)

  app.use('/user', router)
}