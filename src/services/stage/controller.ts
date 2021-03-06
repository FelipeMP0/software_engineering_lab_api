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
      if (result == null) {
        res.status(404).send();
      } else {
        res.status(200).json(result);
      }
    } catch (e) {
      serverError(e, res);
    }
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const result: boolean = await this.stageService.delete(req.params.id);
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
