import { NextFunction, Request, Response } from "express";
import { createConnection } from "typeorm";
import { Company } from "@models/Company";

export default {
  async index(req: Request, res: Response, next: NextFunction) {
    const connection = await createConnection();
    try {
      const companies = await Company.find({ relations: ["employers"] });
      res.send(companies);
    } catch (error) {
      next(error);
      // next("Cant get all companies!");
    } finally {
      connection.close();
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    const connection = await createConnection();

    const { company_id } = req.params;
    try {
      const company = await Company.findOneOrFail(company_id, {
        relations: ["employers"],
      });
      company ? res.send(company) : next("Cant get the specific company!");
    } catch (error) {
      next("Cant get the specific company!");
    } finally {
      connection.close();
    }
  },
  async create(req: Request, res: Response) {
    const connection = await createConnection();

    try {
      const { name } = req.body;
      const company = await Company.create({ name }).save();
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json(error);
    } finally {
      connection.close();
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const connection = await createConnection();
    try {
      const { name } = req.body;
      const { company_id } = req.headers;

      const company = await Company.findOneOrFail(+company_id);

      company.name = name;

      const updatedCompany = await company.save();

      res.status(200).json(updatedCompany);
    } catch (error) {
      next(error);
    } finally {
      connection.close();
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    const connection = await createConnection();

    try {
      const { company_id } = req.headers;
      const company = await Company.delete(company_id);
      if (company.affected) {
        res.status(200).send("Company were deleted!");
      } else {
        next("Error trying to deleted company!");
      }
    } catch (error) {
      next("Error trying to deleted company!");
    } finally {
      connection.close();
    }
  },
};
