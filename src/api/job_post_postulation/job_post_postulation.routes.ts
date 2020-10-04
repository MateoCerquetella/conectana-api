import express from 'express'
import { isAuth } from '../middleware/auth'
import { JobPostPostulationController } from './job_post_postulation.controller'

const router = express.Router()
const jobPostPostulation = new JobPostPostulationController()

export default function jobPostPostulationRoutes(app: express.Express) {
  router.post('/', jobPostPostulation.create)
  router.get('/', jobPostPostulation.findAll)
  router.get('/:id', jobPostPostulation.findOne)
  router.put('/:id', isAuth, jobPostPostulation.update)
  router.delete('/', isAuth, jobPostPostulation.delete)

  app.use('/jobPostPostulation', router)
}