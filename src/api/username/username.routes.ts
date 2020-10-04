import express from 'express'
import { ensureAuthenticated, ensureAuthenticatedAndIsAdmin } from '../middleware/auth'
import { UsernameController } from './username.controller'

const router = express.Router()
const username = new UsernameController()

export default function usernameRoutes(app: express.Express) {
  router.get('/login', username.login)
  router.post('/', username.create)
  router.get('/', ensureAuthenticatedAndIsAdmin, username.findAll)
  router.get('/:id', ensureAuthenticatedAndIsAdmin, username.findOne)
  router.put('/:id', ensureAuthenticatedAndIsAdmin, username.update)
  router.delete('/:id', ensureAuthenticatedAndIsAdmin, username.delete)

  app.use('/username', router)
}