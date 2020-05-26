import { Request, Response } from 'express';
import { TestService } from './service';

export class TestController {
  private testService: TestService;

  constructor() {
    this.testService = new TestService();
  }

  save = async (req: Request, res: Response): Promise<void> => {
    const result = await this.testService.save(req.body);
    res.status(201).json(result);
  };

  findAll = async (_req: Request, res: Response): Promise<Response<unknown>> => {
    const testList = await this.testService.findAll();
    return await res.status(200).json({
      data: testList,
    });
  };
}
