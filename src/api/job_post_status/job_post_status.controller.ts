import * as express from "express";
import db from "../../database/db";
import { IJobPostStatus } from "./job_post_status.model";

const table = () => db<IJobPostStatus>("job_post_status");

export class JobPostStatusController {
  create(req: express.Request, res: express.Response) {
    const job_post_statusTmp: IJobPostStatus = req.body;

    //Validate request
    if (!job_post_statusTmp.name) {
      return res.status(400).send({
        message: "Falta contenido y/o no puede estar vacio.",
      });
    }

    table()
      .insert(job_post_statusTmp)
      .then(() => {
        return res.status(200).send({ message: "Creado con éxito" });
      })
      .catch((error) => {
        if (error.code === "23505") {
          return res.status(409).send({ message: "Ya existe el job post status" });
        }
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }

  findAll(req: express.Request, res: express.Response) {
    table()
      .select()
      .then((job_post_status: IJobPostStatus[]) => {
        return res.status(200).send(job_post_status);
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }

  findOne(req: express.Request, res: express.Response) {
    const job_post_statusTmp: IJobPostStatus = req.body;
    job_post_statusTmp.id = +req.params.id;

    table()
      .where({ id: job_post_statusTmp.id })
      .then((job_post_status: IJobPostStatus[]) => {
        return job_post_status.length > 0
          ? res.status(200).send(job_post_status)
          : res.status(404).send({ message: "Job post status no encontrado" });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }

  update(req: express.Request, res: express.Response) {
    const job_post_statusTmp: IJobPostStatus = req.body;
    job_post_statusTmp.id = +req.params.id;

    //Validate request
    if (!job_post_statusTmp.name) {
      return res.status(400).send({
        message: "Falta contenido y/o no puede estar vacio.",
      });
    }

    table()
      .where({ id: job_post_statusTmp.id })
      .update({ name: job_post_statusTmp.name })
      .then((job_post_status: number) => {
        return job_post_status > 0
          ? res.status(200).send({ message: "Modificado con éxito" })
          : res.status(404).send({ message: "Job post status no encontrado" });
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
      .then((job_post_status: number) => {
        return job_post_status > 0
          ? res.status(200).send({ message: "Borrado con éxito" })
          : res.status(404).send({ message: "Job post status no encontrado" });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Server error", messageError: error.detail });
      });
  }
}
