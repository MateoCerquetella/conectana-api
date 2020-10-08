import express, { RequestHandler } from 'express'
import { TagController } from './tag.controller'

const router = express.Router()
const tag = new TagController()

export default function tagRoutes(app: express.Express) {
  router.post('/', tag.create as RequestHandler)
  router.get('/', tag.findAll as RequestHandler)
  router.get('/:id', tag.findOne as RequestHandler)
  router.put('/:id', tag.update as RequestHandler)
  router.delete('/:id', tag.delete as RequestHandler)

  app.use('/tag', router)
}