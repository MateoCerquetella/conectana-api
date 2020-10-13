import express, { RequestHandler } from 'express'
import { isAuthAdmin } from '../middleware/auth'
import { UsernameController } from './username.controller'

const router = express.Router()
const username = new UsernameController()

export default function usernameRoutes(app: express.Express) {
  router.post('/login', username.login as RequestHandler)
  router.post('/', username.create as RequestHandler)
  router.get('/', isAuthAdmin, username.findAll as RequestHandler)
  router.get('/:id', isAuthAdmin, username.findOne as RequestHandler)
  router.put('/:id', username.update as RequestHandler)
  router.delete('/:id', username.delete as RequestHandler)

  app.use('/username', router)
}