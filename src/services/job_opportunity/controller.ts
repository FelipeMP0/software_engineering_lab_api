import { Request, Response } from 'express';
import { JobOpportunityService } from './service';

export class JobOpportunityController {
  private jobOpportunityService: JobOpportunityService;

  constructor() {
    this.jobOpportunityService = new JobOpportunityService();
  }

  save = async (req: Request, res: Response): Promise<void> => {
    const result = await this.jobOpportunityService.save(req.body);
    res.status(201).json(result);
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    const result = await this.jobOpportunityService.findById(req.params.id);
    res.status(200).json(result);
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    const result = await this.jobOpportunityService.findAll();
    res.status(200).json(result);
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    await this.jobOpportunityService.deleteById(req.params.id);
    res.status(204).send();
  };
}
