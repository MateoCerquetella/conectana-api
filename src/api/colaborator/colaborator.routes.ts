import express from 'express'
import { isAuth } from '../middleware/auth'
import { ColaboratorController } from './colaborator.controller'

const router = express.Router()
const colaborator = new ColaboratorController()

export default function colaboratorRoutes(app: express.Express) {
  router.post('/', colaborator.create)
  router.get('/', colaborator.findAll)
  router.get('/:id', colaborator.findOne)
  router.put('/', isAuth, colaborator.update)
  router.delete('/', isAuth, colaborator.delete)

  app.use('/colaborator', router)
}