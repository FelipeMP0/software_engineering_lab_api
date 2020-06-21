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
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: boolean = await this.candidateService.delete(req.params.id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
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
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  saveJobOpportunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.saveJobOpportunity(req.params.id, req.body);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result?.jobOpportunities);
      }
    } catch (e) {
      serverError(e, res);
    }
  };
}
