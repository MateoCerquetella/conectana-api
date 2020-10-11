import express, { RequestHandler } from 'express'
import { OrganizationController } from './organization.controller'

const router = express.Router()
const organization = new OrganizationController()

export default function organizationRoutes(app: express.Express) {
  router.post('/', organization.create as RequestHandler)
  router.get('/', organization.findAll as RequestHandler)
  router.get('/:id', organization.findOne as RequestHandler)
  router.put('/', organization.update as RequestHandler)
  router.delete('/:id', organization.delete as RequestHandler)

  app.use('/organization', router)
}