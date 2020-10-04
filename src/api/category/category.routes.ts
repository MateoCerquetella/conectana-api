import express from 'express'
import { ensureAuthenticatedAndIsAdmin } from '../middleware/auth'
import { CategoryController } from './category.controller'

const router = express.Router()
const category = new CategoryController()

export default function categoryRoutes(app: express.Express) {
  router.post('/', ensureAuthenticatedAndIsAdmin, category.create)
  router.get('/', category.findAll)
  router.get('/:id', category.findOne)
  router.put('/:id', ensureAuthenticatedAndIsAdmin, category.update)
  router.delete('/:id', ensureAuthenticatedAndIsAdmin, category.delete)

  app.use('/category', router)
}