import express from 'express'
import { isAuth } from '../middleware/auth'
import { OrganizationEmployeeController } from './organization_employee.controller'

const router = express.Router()
const organizationEmployee = new OrganizationEmployeeController()

export default function organizationEmployeeRoutes(app: express.Express) {
  router.post('/', organizationEmployee.create)
  router.get('/', organizationEmployee.findAll)
  router.get('/:id', organizationEmployee.findOne)
  router.put('/:id', isAuth, organizationEmployee.update)
  router.delete('/', isAuth, organizationEmployee.delete)

  app.use('/organizationEmployee', router)
}