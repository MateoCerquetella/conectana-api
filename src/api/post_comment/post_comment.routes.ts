import express, { RequestHandler } from 'express'

import { PostCommentController } from './post_comment.controller'

const router = express.Router()
const postComment = new PostCommentController()

export default function postCommentRoutes(app: express.Express) {
  router.post('/', postComment.create as RequestHandler)
  router.get('/', postComment.findAll as RequestHandler)
  router.get('/:id', postComment.findOne as RequestHandler)
  router.put('/:id', postComment.update as RequestHandler)
  router.delete('/:id', postComment.delete as RequestHandler)

  app.use('/postComment', router)
}