import express from 'express'
import { TagController } from './tag.controller'
import { isAuth } from '../middleware/auth'

const router = express.Router()
const tag = new TagController()

export default function tagRoutes(app: express.Express) {
  router.post('/', isAuth, tag.create)
  router.get('/', tag.findAll)
  router.get('/:id', tag.findOne)
  router.put('/:id', tag.update)
  router.delete('/:id', tag.delete)

  app.use('/tag', router)
}