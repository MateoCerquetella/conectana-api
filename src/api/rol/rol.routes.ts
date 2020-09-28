import express from 'express';
import { Express } from 'express-serve-static-core';
import { RolController } from './rol.controller';
import { ensureAuthenticated } from '../middleware/auth';

const router = express.Router();
const rol = new RolController();

export default function rolRoutes(app: Express) {
    router.post('/', rol.create);
    router.get('/', rol.findAll);
    router.get('/:id', rol.findOne);
    router.put('/:id', rol.update)
    router.delete('/:id', rol.delete);

    app.use('/rol', router);
};