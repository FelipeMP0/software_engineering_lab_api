import { Request, Response } from 'express';
import { SkillService } from './service';
import { serverError } from '../../utils/errorHandler';

export class SkillController {
  private skillService: SkillService;

  constructor() {
    this.skillService = new SkillService();
  }

  create = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.skillService.save(req.body);
      res.status(201).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.skillService.update(req.params.id, req.body);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  findById = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.skillService.findById(req.params.id);
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  findAll = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.skillService.findAll();
      res.status(200).json(result);
    } catch (e) {
      serverError(e, res);
    }
  };

  deleteById = async (req: Request, res: Response): Promise<void> => {
    try {
      await this.skillService.deleteById(req.params.id, req.body.deleteReason);
      res.status(204).send();
    } catch (e) {
      serverError(e, res);
    }
  };

  activate = async (req: Request, res: Response): Promise<void> => {
    try {
      const result = await this.skillService.activate(req.params.id);
      if (result != null) {
        res.status(200).json(result);
      } else {
        res.status(404).send();
      }
    } catch (e) {
      serverError(e, res);
    }
  };
}
