import express from 'express'
import { Express } from 'express-serve-static-core'
import { ensureAuthenticated } from '../middleware/auth'
import { OrganizationEmployeeController } from './organization_employee.controller'

const router = express.Router()
const organizationEmployee = new OrganizationEmployeeController()

export default function organizationEmployeeRoutes(app: Express) {
  router.post('/', organizationEmployee.create)
  router.get('/', organizationEmployee.findAll)
  router.get('/:id', organizationEmployee.findOne)
  router.put('/', ensureAuthenticated, organizationEmployee.update)
  router.delete('/', ensureAuthenticated, organizationEmployee.delete)

  app.use('/organizationEmployee', router)
}