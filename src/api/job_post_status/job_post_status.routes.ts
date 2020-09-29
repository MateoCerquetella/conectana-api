import express from 'express';
import { Express } from 'express-serve-static-core';
import { JobPostStatusController } from './job_post_status.controller';
import { ensureAuthenticated } from '../middleware/auth';

const router = express.Router();
const job_post_status = new JobPostStatusController();

export default function jobPostStatusRoutes(app: Express) {
    router.post('/', job_post_status.create);
    router.get('/', job_post_status.findAll);
    router.get('/:id', job_post_status.findOne);
    router.put('/:id', job_post_status.update)
    router.delete('/:id', job_post_status.delete);

    app.use('/job_post_status', router);
};