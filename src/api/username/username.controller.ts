import { UsernameI } from './username.model'

export class UsernameController {

  login(req: any, res: any) {
    const foo: UsernameI = {
      first_name: "mateo",
      last_name: "cerquetella"
    }

    return res.status(200).send(foo);
  }

  create(req: any, res: any) {
    const foo: UsernameI = {
      first_name: "mateo2",
      last_name: "cerquetella2"
    }

    return res.status(200).send(foo);
  }

  findAll(req: any, res: any) {
    const foo: UsernameI = {
      first_name: "mateo2",
      last_name: "cerquetella2"
    }

    return res.status(200).send(foo);
  }

  findOne(req: any, res: any) {
    const id = req.params.id;

    const foo: UsernameI = {
      first_name: "mateo2",
      last_name: "cerquetella2"
    }

    return res.status(200).send(id);
  }

  update(req: any, res: any) {
    const id = req.params.id;

    const foo: UsernameI = {
      first_name: "mateo2",
      last_name: "cerquetella2"
    }

    return res.status(200).send(foo);
  }

  delete(req: any, res: any) {
    const id = req.params.id;

    const foo: UsernameI = {
      first_name: "mateo2",
      last_name: "cerquetella2"
    }

    return res.status(200).send(foo);
  }
}