import { BaseRouter } from '../common/baseRouter.router';
import { Application } from 'express';
import { CandidateController } from './controller';
import multer from 'multer';

export class CandidateRouter implements BaseRouter {
  private app: Application;
  private candidateController: CandidateController;

  constructor(app: Application) {
    this.app = app;
    this.candidateController = new CandidateController();
    this.initRoute();
  }

  initRoute(): void {
    const UPLOAD_PATH = 'uploads';
    const upload = multer({ dest: `${UPLOAD_PATH}/`, storage: multer.memoryStorage() });
    this.app.get('/candidates', this.candidateController.findAll);
    this.app.get('/candidates/:id', this.candidateController.findById);
    this.app.post('/candidates', this.candidateController.save);
    this.app.put('/candidates/:id', this.candidateController.update);
    this.app.delete('/candidates/:id', this.candidateController.delete);
    this.app.post('/candidates/:id/job-opportunities', this.candidateController.saveJobOpportunity);
    this.app.post('/candidates/:id/resume', upload.single('resume'), this.candidateController.uploadResumeFile);
    this.app.get('/candidates/:id/resume', this.candidateController.downloadResumeFile);
    this.app.delete('/candidates/:id/resume', this.candidateController.deleteResumeFile);
  }
}
