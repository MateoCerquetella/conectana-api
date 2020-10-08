import express, { RequestHandler } from 'express'

import { JobPostController } from './job_post.controller'

const router = express.Router()
const jobPost = new JobPostController()

export default function jobPostRoutes(app: express.Express) {
  router.post('/', jobPost.create as RequestHandler)
  router.get('/', jobPost.findAll as RequestHandler)
  router.get('/:id', jobPost.findOne as RequestHandler)
  router.put('/:id', jobPost.update as RequestHandler)
  router.delete('/', jobPost.delete as RequestHandler)

  app.use('/jobPost', router)
}