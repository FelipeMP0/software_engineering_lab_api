import { Request, Response } from 'express';
import { SkillEvaluationService } from './service';
import { serverError } from '../../utils/errorHandler';

export class SkillEvaluationController {
  private skillEvaluationService: SkillEvaluationService;

  constructor() {
    this.skillEvaluationService = new SkillEvaluationService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.skillEvaluationService.save(req.body);
      res.status(201).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };
}
