import express from 'express'
import { JobPostStatusController } from './job_post_status.controller'
import { ensureAuthenticatedAndIsAdmin } from '../middleware/auth'

const router = express.Router()
const jobPostStatus = new JobPostStatusController()

export default function jobPostStatusRoutes(app: express.Express) {
    router.post('/', ensureAuthenticatedAndIsAdmin, jobPostStatus.create)
    router.get('/', jobPostStatus.findAll)
    router.get('/:id', jobPostStatus.findOne)
    router.put('/:id', ensureAuthenticatedAndIsAdmin, jobPostStatus.update)
    router.delete('/:id', ensureAuthenticatedAndIsAdmin, jobPostStatus.delete)

    app.use('/jobPostStatus', router)
}