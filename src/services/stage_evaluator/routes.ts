import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { StageEvaluatorController } from './controller';

export class StageEvaluatorRouter implements BaseRouter {
  private app: Application;
  private stageEvaluatorController: StageEvaluatorController;

  constructor(app: Application) {
    this.app = app;
    this.stageEvaluatorController = new StageEvaluatorController();
    this.initRoute();
  }

  initRoute(): void {
    this.app.get('/evaluations', this.stageEvaluatorController.findByEvaluatorAuthToken);
    this.app.get('/evaluations/:id/job-opportunity', this.stageEvaluatorController.findJobOpportunityForId);
    this.app.get('/evaluations/:id/candidate', this.stageEvaluatorController.findCandidateForId);
    this.app.get('/evaluations/:id/skills', this.stageEvaluatorController.findSkillsForId);
  }
}
