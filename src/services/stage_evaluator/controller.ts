import { Request, Response } from 'express';
import { StageEvaluatorService } from './service';
import { serverError } from '../../utils/errorHandler';
import { CandidateService } from '../candidate/service';
import { StageEvaluatorPresenter, toStageEvaluatorPresenter } from './presenter';
import { StageEvaluatorModel } from './model';
import { JobOpportunityModel } from '../job_opportunity/model';
import { CandidateModel } from '../candidate/model';

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
      const stageEvaluatorList = await this.stageEvaluatorService.findByEvaluatorAuthToken(basicAuth);
      if (stageEvaluatorList != null) {
        const stageEvaluatorPresenters: StageEvaluatorPresenter[] = [];
        for (const stageEvaluator of stageEvaluatorList) {
          const jobOpportunity = await this.stageEvaluatorService.findJobOpportunity(stageEvaluator._id);
          const candidate = await this.candidateService.findWithStageEvaluatorId(stageEvaluator._id);
          if (jobOpportunity != null && candidate != null) {
            stageEvaluatorPresenters.push(toStageEvaluatorPresenter(stageEvaluator, jobOpportunity, candidate));
          }
        }
        res.status(200).json(stageEvaluatorPresenters);
        return;
      }
      res.status(404).send();
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
