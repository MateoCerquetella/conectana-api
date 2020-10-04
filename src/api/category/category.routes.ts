import express from 'express'
import { isAuthAdmin } from '../middleware/auth'
import { CategoryController } from './category.controller'

const router = express.Router()
const category = new CategoryController()

export default function categoryRoutes(app: express.Express) {
  router.post('/', isAuthAdmin, category.create)
  router.get('/', category.findAll)
  router.get('/:id', category.findOne)
  router.put('/:id', isAuthAdmin, category.update)
  router.delete('/:id', isAuthAdmin, category.delete)

  app.use('/category', router)
}