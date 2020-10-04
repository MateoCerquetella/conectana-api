import express, { RequestHandler } from 'express'
import { PostController } from './post.controller'

const router = express.Router()
const post = new PostController()

export default function postRoutes(app: express.Express) {
  router.post('/', post.create as RequestHandler)
  router.get('/', post.findAll as RequestHandler)
  router.get('/:id', post.findOne as RequestHandler)
  router.put('/:id', post.update as RequestHandler)
  router.delete('/:id', post.delete as RequestHandler)

  app.use('/post', router)
}