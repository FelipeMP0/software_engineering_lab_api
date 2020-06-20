import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { JobOpportunityController } from './controller';

export class JobOpportunityRouter implements BaseRouter {
  private app: Application;
  private jobOpportunityController: JobOpportunityController;

  constructor(app: Application) {
    this.app = app;
    this.jobOpportunityController = new JobOpportunityController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.post('/job-opportunities', this.jobOpportunityController.save);
    this.app.put('/job-opportunities/:id', this.jobOpportunityController.save);
    this.app.get('/job-opportunities', this.jobOpportunityController.findAll);
    this.app.get('/job-opportunities/:id', this.jobOpportunityController.findById);
    this.app.delete('/job-opportunities/:id', this.jobOpportunityController.delete);
  }
}
