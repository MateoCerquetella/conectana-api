import express, { RequestHandler } from 'express'

import { OrganizationEmployeeController } from './organization_employee.controller'

const router = express.Router()
const organizationEmployee = new OrganizationEmployeeController()

export default function organizationEmployeeRoutes(app: express.Express) {
  router.post('/', organizationEmployee.create as RequestHandler)
  router.get('/', organizationEmployee.findAll as RequestHandler)
  router.get('/:id', organizationEmployee.findOne as RequestHandler)
  router.put('/:id', organizationEmployee.update as RequestHandler)
  router.delete('/', organizationEmployee.delete as RequestHandler)

  app.use('/organizationEmployee', router)
}