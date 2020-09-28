import * as express from "express";
import db from "../../database/db";
import { RolI } from "./rol.model";

const table = () => db<RolI>("rol");

export class RolController {
  create(req: express.Request, res: express.Response) {
    const rolTmp: RolI = req.body;

    //Validate request
    if (!rolTmp.name) {
      return res.status(400).send({
        message: "Falta contenido y/o no puede estar vacio.",
      });
    }

    table()
      .insert(rolTmp)
      .then(() => {
        return res.status(200).send({ message: "Creado con éxito" });
      })
      .catch((error) => {
        if (error.code === "23505") {
          return res.status(409).send({ message: "Ya existe el rol" });
        }
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }

  findAll(req: express.Request, res: express.Response) {
    table()
      .select()
      .then((rol: RolI[]) => {
        return res.status(200).send(rol);
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }

  findOne(req: express.Request, res: express.Response) {
    const rolTmp: RolI = req.body;
    rolTmp.id = +req.params.id;

    table()
      .where({ id: rolTmp.id })
      .then((rol: RolI[]) => {
        return rol.length > 0
          ? res.status(200).send(rol)
          : res.status(404).send({ message: "Rol no encontrado" });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }

  update(req: express.Request, res: express.Response) {
    const rolTmp: RolI = req.body;
    rolTmp.id = +req.params.id;

    //Validate request
    if (!rolTmp.name) {
      return res.status(400).send({
        message: "Falta contenido y/o no puede estar vacio.",
      });
    }

    table()
      .where({ id: rolTmp.id })
      .update({ name: rolTmp.name })
      .then((rol: number) => {
        return rol > 0
          ? res.status(200).send({ message: "Modificado con éxito" })
          : res.status(404).send({ message: "Rol no encontrado" });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }

  delete(req: express.Request, res: express.Response) {
    table()
      .where({ id: +req.params.id })
      .del()
      .then((rol: number) => {
        return rol > 0
          ? res.status(200).send({ message: "Borrado con éxito" })
          : res.status(404).send({ message: "Rol no encontrado" });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }
}
