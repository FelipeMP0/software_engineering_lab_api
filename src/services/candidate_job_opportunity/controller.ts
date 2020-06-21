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
      const result: boolean = await this.candidateJobOpportunityService.delete(req.params.id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (e) {
      serverError(e, res);
    }
  };
}
