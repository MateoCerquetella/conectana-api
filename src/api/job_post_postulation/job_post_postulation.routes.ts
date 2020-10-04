import express, { RequestHandler } from 'express'

import { JobPostPostulationController } from './job_post_postulation.controller'

const router = express.Router()
const jobPostPostulation = new JobPostPostulationController()

export default function jobPostPostulationRoutes(app: express.Express) {
  router.post('/', jobPostPostulation.create as RequestHandler)
  router.get('/', jobPostPostulation.findAll as RequestHandler)
  router.get('/:id', jobPostPostulation.findOne as RequestHandler)
  router.put('/:id', jobPostPostulation.update as RequestHandler)
  router.delete('/', jobPostPostulation.delete as RequestHandler)

  app.use('/jobPostPostulation', router)
}