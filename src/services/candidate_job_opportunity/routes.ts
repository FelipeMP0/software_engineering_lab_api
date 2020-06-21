import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { CandidateJobOpportunityController } from './controller';

export class CandidateJobOpportunityRouter implements BaseRouter {
  private app: Application;
  private candidateJobOpportunityController: CandidateJobOpportunityController;

  constructor(app: Application) {
    this.app = app;
    this.candidateJobOpportunityController = new CandidateJobOpportunityController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.delete('/candidates/job-opportunities/:id', this.candidateJobOpportunityController.delete);
  }
}
