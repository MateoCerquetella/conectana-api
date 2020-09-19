import { UserI } from './user.model'

export class UserController {

  login(req: any, res: any) {
    const foo: UserI = {
      first_name: "mateo",
      last_name: "cerquetella"
    }

    return res.status(200).send(foo);
  }
}