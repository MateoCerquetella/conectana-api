import express from 'express'
import { ensureAuthenticated } from '../middleware/auth'
import { PostCommentController } from './post_comment.controller'

const router = express.Router()
const postComment = new PostCommentController()

export default function postCommentRoutes(app: express.Express) {
  router.post('/', postComment.create)
  router.get('/', postComment.findAll)
  router.get('/:id', postComment.findOne)
  router.put('/:id', ensureAuthenticated, postComment.update)
  router.delete('/', ensureAuthenticated, postComment.delete)

  app.use('/postComment', router)
}