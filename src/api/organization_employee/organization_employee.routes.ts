import express from 'express'
import { ensureAuthenticated } from '../middleware/auth'
import { OrganizationEmployeeController } from './organization_employee.controller'

const router = express.Router()
const organizationEmployee = new OrganizationEmployeeController()

export default function organizationEmployeeRoutes(app: express.Express) {
  router.post('/', organizationEmployee.create)
  router.get('/', organizationEmployee.findAll)
  router.get('/:id', organizationEmployee.findOne)
  router.put('/:id', ensureAuthenticated, organizationEmployee.update)
  router.delete('/', ensureAuthenticated, organizationEmployee.delete)

  app.use('/organizationEmployee', router)
}