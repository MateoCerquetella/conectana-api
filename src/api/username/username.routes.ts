import express from 'express'
import { isAuth, isAuthAdmin } from '../middleware/auth'
import { UsernameController } from './username.controller'

const router = express.Router()
const username = new UsernameController()

export default function usernameRoutes(app: express.Express) {
  router.get('/login', username.login)
  router.post('/', username.create)
  router.get('/', isAuthAdmin, username.findAll)
  router.get('/:id', isAuthAdmin, username.findOne)
  router.put('/:id', isAuthAdmin, username.update)
  router.delete('/:id', isAuthAdmin, username.delete)

  app.use('/username', router)
}