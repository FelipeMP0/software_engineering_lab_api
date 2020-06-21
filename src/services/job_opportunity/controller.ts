import { Request, Response } from 'express';
import { JobOpportunityService } from './service';
import { serverError } from '../../utils/errorHandler';

export class JobOpportunityController {
  private jobOpportunityService: JobOpportunityService;

  constructor() {
    this.jobOpportunityService = new JobOpportunityService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.jobOpportunityService.save(req.body);
      res.status(201).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.jobOpportunityService.update(req.params.id, req.body);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.jobOpportunityService.findById(req.params.id);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.jobOpportunityService.findAll();
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: boolean = await this.jobOpportunityService.deleteById(req.params.id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  findStagesById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.jobOpportunityService.findById(req.params.id);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result?.stages);
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  saveStages = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.jobOpportunityService.saveStages(req.params.id, req.body);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result?.stages);
      }
    } catch (e) {
      serverError(e, res);
    }
  };
}
