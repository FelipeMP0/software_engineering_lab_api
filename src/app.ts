import express, { Application } from 'express';
import { applyMiddleware } from './utils';
import middleware from './middlewares';
import errorHandlers from './middlewares/errorHandlers';
import { TestRouter } from './services/test/routes';
import { DBConfig } from './config/DbConfig';
import { UserRouter } from './services/user/routes';
import { JobOpportunityRouter } from './services/job_opportunity/routes';
import { StageRouter } from './services/stage/routes';
import { SkillRouter } from './services/skill/routes';
import { DepartmentRouter } from './services/department/routes';
import { CandidateRouter } from './services/candidate/routes';
import { CandidateJobOpportunityRouter } from './services/candidate_job_opportunity/routes';
import { StageEvaluatorRouter } from './services/stage_evaluator/routes';
import { SkillEvaluationRouter } from './services/skill_evaluation/routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.configure();
  }

  private configure(): void {
    applyMiddleware(middleware, this.app);
    this.setRoutes();
    applyMiddleware(errorHandlers, this.app);
    new DBConfig();
  }

  private setRoutes(): void {
    new TestRouter(this.app);
    new UserRouter(this.app);
    new JobOpportunityRouter(this.app);
    new StageRouter(this.app);
    new SkillRouter(this.app);
    new DepartmentRouter(this.app);
    new CandidateRouter(this.app);
    new CandidateJobOpportunityRouter(this.app);
    new StageEvaluatorRouter(this.app);
    new SkillEvaluationRouter(this.app);
  }
}

export default new App().app;
