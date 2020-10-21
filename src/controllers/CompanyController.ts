import { Request, Response } from "express";
import { createConnection } from "typeorm";
import { Company } from "@models/Company";

export default {
  async index(req: Request, res: Response) {
    const connection = await createConnection();
    try {
      const companies = await Company.find();
      res.send(companies);
    } catch (error) {
      res.status(400).send("Cant get all companies!");
    } finally {
      connection.close();
    }
  },
  async show(req: Request, res: Response) {
    const connection = await createConnection();

    const { company_id } = req.params;
    try {
      const company = await Company.findOneOrFail(company_id);
      company
        ? res.send(company)
        : res.status(400).send("Cant get the specific company!");
    } catch (error) {
      res.status(400).send("Cant get the specific company!");
    } finally {
      connection.close();
    }
  },
  async create(req: Request, res: Response) {
    const connection = await createConnection();

    try {
      const { name } = req.body;
      const UserRepository = connection.getRepository(Company);
      const company = await UserRepository.create({ name }).save();
      res.status(201).send(company);
    } catch (error) {
      res.send(400).send("Invalid parameters!");
    } finally {
      connection.close();
    }
  },
  async update(req: Request, res: Response) {
    const connection = await createConnection();
    const { name } = req.body;
    const { company_id } = req.headers;
    try {
      await Company.update(company_id, { name });
      const company = await Company.findOneOrFail(company_id as any);
      res.status(200).send(company);
    } catch (error) {
      res.status(400).send("Error trying to update company!");
    } finally {
      connection.close();
    }
  },
  async destroy(req: Request, res: Response) {
    const connection = await createConnection();

    try {
      const { company_id } = req.headers;
      const company = await Company.delete(company_id);
      if (company.affected) {
        res.status(200).send("Company were deleted!");
      } else {
        res.status(400).send("Error trying to deleted company!");
      }
    } catch (error) {
      res.status(400).send("Error trying to deleted company!");
    } finally {
      connection.close();
    }
  },
};
