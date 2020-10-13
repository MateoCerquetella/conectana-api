import express, { RequestHandler } from 'express'
import { isAuthAdmin } from '../middleware/auth'
import { TagController } from './tag.controller'

const router = express.Router()
const tag = new TagController()

export default function tagRoutes(app: express.Express) {
  router.post('/', isAuthAdmin, tag.create as RequestHandler)
  router.get('/', tag.findAll as RequestHandler)
  router.get('/:id', tag.findOne as RequestHandler)
  router.put('/:id', isAuthAdmin, tag.update as RequestHandler)
  router.delete('/:id', isAuthAdmin, tag.delete as RequestHandler)

  app.use('/tag', router)
}