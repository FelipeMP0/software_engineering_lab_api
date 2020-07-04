import { Request, Response } from 'express';
import { CandidateService } from './service';
import { serverError } from '../../utils/errorHandler';
import fs from 'fs';
import { CandidatePresenter } from './presenter';
import { CandidateModel } from './model';

export class CandidateController {
  private candidateService: CandidateService;

  constructor() {
    this.candidateService = new CandidateService();
  }

  toPresenter(model: CandidateModel): CandidatePresenter {
    let hasResume = false;
    if (model.base64Resume != null && model.base64Resume !== '') {
      hasResume = true;
    }
    const result: CandidatePresenter = {
      _id: model._id,
      name: model.name,
      cpf: model.cpf,
      address: model.address,
      links: model.links,
      jobOpportunities: model.jobOpportunities,
      hasResume: hasResume,
    };
    return result;
  }

  save = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.save(req.body);
      res.status(201).json(this.toPresenter(result));
    } catch (e) {
      serverError(e, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.update(req.params.id, req.body);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(this.toPresenter(result));
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: boolean = await this.candidateService.delete(req.params.id);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send();
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.findAll();
      const presenters: CandidatePresenter[] = [];
      for (const m of result) {
        presenters.push(this.toPresenter(m));
      }
      res.status(200).json(presenters);
    } catch (e) {
      serverError(e, res);
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.findById(req.params.id);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(this.toPresenter(result));
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  saveJobOpportunity = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.saveJobOpportunity(req.params.id, req.body);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result?.jobOpportunities);
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  uploadResumeFile = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.candidateService.uploadResume(req.params.id, req.file);
      res.status(201).send();
    } catch (e) {
      serverError(e, res);
    }
  };

  downloadResumeFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.downloadResume(req.params.id);
      if (result) {
        const download = Buffer.from(result, 'base64');
        res.writeHead(200, {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="resume.pdf"',
        });
        res.end(download);
      } else {
        res.status(404).send();
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  deleteResumeFile = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.candidateService.deleteResume(req.params.id);
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(204).send();
      }
    } catch (e) {
      serverError(e, res);
    }
  };
}
