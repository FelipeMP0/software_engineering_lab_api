import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { CandidateController } from './controller';

export class CandidateRouter implements BaseRouter {
  private app: Application;
  private candidateController: CandidateController;

  constructor(app: Application) {
    this.app = app;
    this.candidateController = new CandidateController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.get('/candidates', this.candidateController.findAll);
    this.app.get('/candidates/:id', this.candidateController.findById);
    this.app.post('/candidates', this.candidateController.save);
    this.app.put('/candidates/:id', this.candidateController.update);
    this.app.delete('/candidates/:id', this.candidateController.delete);
    this.app.post('/candidates/:id/job-opportunities', this.candidateController.saveJobOpportunity);
  }
}
