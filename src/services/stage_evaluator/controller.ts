import { Request, Response } from 'express';
import { StageEvaluatorService } from './service';
import { serverError } from '../../utils/errorHandler';
import { CandidateService } from '../candidate/service';

export class StageEvaluatorController {
  private stageEvaluatorService: StageEvaluatorService;
  private candidateService: CandidateService;

  constructor() {
    this.stageEvaluatorService = new StageEvaluatorService();
    this.candidateService = new CandidateService();
  }

  findByEvaluatorAuthToken = async (req: Request, res: Response): Promise<void> => {
    try {
      const basicAuth = req.headers['authorization']!.replace('Basic ', '');
      const result = await this.stageEvaluatorService.findByEvaluatorAuthToken(basicAuth);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  findJobOpportunityForId = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.stageEvaluatorService.findJobOpportunity(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  findCandidateForId = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.findWithStageEvaluatorId(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  findSkillsForId = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.stageEvaluatorService.findSkillsForId(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };
}
