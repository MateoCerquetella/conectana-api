import express, { RequestHandler } from 'express'
import { JobPostStatusController } from './job_post_status.controller'
import { isAuthAdmin } from '../middleware/auth'

const router = express.Router()
const jobPostStatus = new JobPostStatusController()

export default function jobPostStatusRoutes(app: express.Express) {
    router.post('/', isAuthAdmin, jobPostStatus.create as RequestHandler)
    router.get('/', jobPostStatus.findAll as RequestHandler)
    router.get('/:id', jobPostStatus.findOne as RequestHandler)
    router.put('/:id', isAuthAdmin, jobPostStatus.update as RequestHandler)
    router.delete('/:id', isAuthAdmin, jobPostStatus.delete as RequestHandler)

    app.use('/jobPostStatus', router)
}