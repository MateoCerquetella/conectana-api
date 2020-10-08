import express, { RequestHandler } from 'express'
import { isAuthAdmin } from '../middleware/auth'
import { CategoryController } from './category.controller'

const router = express.Router()
const category = new CategoryController()

export default function categoryRoutes(app: express.Express) {
  router.post('/', isAuthAdmin, category.create as RequestHandler)
  router.get('/', category.findAll as RequestHandler)
  router.get('/:id', category.findOne as RequestHandler)
  router.put('/:id', isAuthAdmin, category.update as RequestHandler)
  router.delete('/:id', isAuthAdmin, category.delete as RequestHandler)

  app.use('/category', router)
}