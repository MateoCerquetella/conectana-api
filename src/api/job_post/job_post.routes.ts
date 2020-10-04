import express from 'express'
import { ensureAuthenticated } from '../middleware/auth'
import { JobPostController } from './job_post.controller'

const router = express.Router()
const jobPost = new JobPostController()

export default function jobPostRoutes(app: express.Express) {
  router.post('/', jobPost.create)
  router.get('/', jobPost.findAll)
  router.get('/:id', jobPost.findOne)
  router.put('/:id', ensureAuthenticated, jobPost.update)
  router.delete('/', ensureAuthenticated, jobPost.delete)

  app.use('/jobPost', router)
}