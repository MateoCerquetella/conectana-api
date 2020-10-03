import express from 'express'
import { Express } from 'express-serve-static-core'
import { ensureAuthenticated } from '../middleware/auth'
import { OrganizationEmployeeController } from './organization_employee.controller'

const router = express.Router()
const organization = new OrganizationEmployeeController()

export default function organizationEmployeeRoutes(app: Express) {
  router.post('/', organization.create)
  router.get('/', organization.findAll)
  router.get('/:id', organization.findOne)
  router.put('/', ensureAuthenticated, organization.update)
  router.delete('/', ensureAuthenticated, organization.delete)

  app.use('/organizationEmployee', router)
}