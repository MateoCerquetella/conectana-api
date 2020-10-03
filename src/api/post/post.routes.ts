import express from 'express'
import { Express } from 'express-serve-static-core'
import { PostController } from './post.controller'
import { ensureAuthenticated } from '../middleware/auth'


const router = express.Router()
const post = new PostController()

export default function postRoutes(app: Express) {
  router.post('/', ensureAuthenticated, post.create)
  router.get('/', post.findAll)
  router.get('/:id', post.findOne)
  router.put('/:id', post.update)
  router.delete('/:id', post.delete)

  app.use('/post', router)
}