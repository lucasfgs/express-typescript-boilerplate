import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Company } from "@models/Company";

export default {
  async index(req: Request, res: Response, next: NextFunction) {
    const CompanyRepository = await getRepository(Company);
    try {
      const companies = await CompanyRepository.find({
        relations: ["employers"],
      });
      res.send(companies);
    } catch (error) {
      next(error);
      // next("Cant get all companies!");
    }
  },
  async show(req: Request, res: Response, next: NextFunction) {
    const CompanyRepository = await getRepository(Company);

    const { company_id } = req.params;
    try {
      const company = await CompanyRepository.findOneOrFail(company_id, {
        relations: ["employers"],
      });
      company ? res.send(company) : next("Cant get the specific company!");
    } catch (error) {
      next("Cant get the specific company!");
    }
  },
  async create(req: Request, res: Response) {
    const CompanyRepository = await getRepository(Company);

    try {
      const { name } = req.body;
      const company = await CompanyRepository.create({ name }).save();
      res.status(201).json(company);
    } catch (error) {
      res.status(400).json(error);
    }
  },
  async update(req: Request, res: Response, next: NextFunction) {
    const CompanyRepository = await getRepository(Company);

    try {
      const { name } = req.body;
      const { company_id } = req.headers;

      const company = await CompanyRepository.findOneOrFail(+company_id);

      company.name = name;

      const updatedCompany = await company.save();

      res.status(200).json(updatedCompany);
    } catch (error) {
      next(error);
    }
  },
  async destroy(req: Request, res: Response, next: NextFunction) {
    const CompanyRepository = await getRepository(Company);

    try {
      const { company_id } = req.headers;
      const company = await CompanyRepository.delete(company_id);
      if (company.affected) {
        res.status(200).send("Company were deleted!");
      } else {
        next("Error trying to deleted company!");
      }
    } catch (error) {
      next("Error trying to deleted company!");
    }
  },
};
