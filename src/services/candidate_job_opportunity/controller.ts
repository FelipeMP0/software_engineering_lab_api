import { Request, Response } from 'express';

import { CandidateJobOpportunityService } from './service';
import { serverError } from '../../utils/errorHandler';

export class CandidateJobOpportunityController {
  private candidateJobOpportunityService: CandidateJobOpportunityService;

  constructor() {
    this.candidateJobOpportunityService = new CandidateJobOpportunityService();
  }

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.candidateJobOpportunityService.delete(req.params.id);
      res.status(204).send();
    } catch (e) {
      serverError(e, res);
    }
  };
}
