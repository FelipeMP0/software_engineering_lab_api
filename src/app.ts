import express, { Application } from 'express';
import { applyMiddleware } from './utils';
import middleware from './middlewares';
import errorHandlers from './middlewares/errorHandlers';
import { TestRouter } from './services/test/routes';
import { DBConfig } from './config/DbConfig';
import { UserRouter } from './services/user/routes';
import { JobOpportunityRouter } from './services/job_opportunity/routes';

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
  }
}

export default new App().app;
