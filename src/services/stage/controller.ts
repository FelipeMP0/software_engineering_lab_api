import { Request, Response } from 'express';
import { StageService } from './service';
import { serverError } from '../../utils/errorHandler';

export class StageController {
  private stageService: StageService;

  constructor() {
    this.stageService = new StageService();
  }

  save = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.stageService.save(req.body);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.stageService.update(req.params.id, req.body);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.stageService.delete(req.params.id);
      res.status(204).send();
    } catch (e) {
      serverError(e, res);
    }
  };
}
