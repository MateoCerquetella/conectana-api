import express from 'express'
import { Express } from 'express-serve-static-core'
import { JobPostStatusController } from './job_post_status.controller'
import { ensureAuthenticated } from '../middleware/auth'

const router = express.Router()
const jobPostStatus = new JobPostStatusController()

export default function jobPostStatusRoutes(app: Express) {
    router.post('/', ensureAuthenticated, jobPostStatus.create)
    router.get('/', jobPostStatus.findAll)
    router.get('/:id', jobPostStatus.findOne)
    router.put('/:id', ensureAuthenticated, jobPostStatus.update)
    router.delete('/:id', ensureAuthenticated, jobPostStatus.delete)

    app.use('/jobPostStatus', router)
}