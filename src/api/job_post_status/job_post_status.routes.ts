import express from 'express'
import { JobPostStatusController } from './job_post_status.controller'
import { isAuthAdmin } from '../middleware/auth'

const router = express.Router()
const jobPostStatus = new JobPostStatusController()

export default function jobPostStatusRoutes(app: express.Express) {
    router.post('/', isAuthAdmin, jobPostStatus.create)
    router.get('/', jobPostStatus.findAll)
    router.get('/:id', jobPostStatus.findOne)
    router.put('/:id', isAuthAdmin, jobPostStatus.update)
    router.delete('/:id', isAuthAdmin, jobPostStatus.delete)

    app.use('/jobPostStatus', router)
}