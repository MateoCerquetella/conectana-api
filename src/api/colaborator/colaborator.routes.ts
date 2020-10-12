import express, { RequestHandler } from 'express'
import { ColaboratorController } from './colaborator.controller'

const router = express.Router()
const colaborator = new ColaboratorController()

export default function colaboratorRoutes(app: express.Express) {
  router.post('/', colaborator.create as RequestHandler)
  router.get('/', colaborator.findAll as RequestHandler)
  router.get('/:id', colaborator.findOne as RequestHandler)
  router.put('/', colaborator.update as RequestHandler)
  router.delete('/', colaborator.delete as RequestHandler)

  app.use('/colaborator', router)
}