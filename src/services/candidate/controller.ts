import { Request, Response } from 'express';
import { CandidateService } from './service';
import { serverError } from '../../utils/errorHandler';

export class CandidateController {
  private candidateService: CandidateService;

  constructor() {
    this.candidateService = new CandidateService();
  }

  save = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.save(req.body);
      res.status(201).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.update(req.params.id, req.body);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.candidateService.delete(req.params.id);
      res.status(204).send();
    } catch (e) {
      serverError(e, res);
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.findAll();
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.findById(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  saveJobOpportunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.saveJobOpportunity(req.params.id, req.body);
      res.status(200).json(result?.jobOpportunities);
    } catch (e) {
      serverError(e, res);
    }
  };
}
