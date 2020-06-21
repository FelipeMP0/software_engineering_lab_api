import { Model } from 'mongoose';
import { StageEvaluatorModel } from './model';
import { stageEvaluatorSchema } from './schema';
import { StageEvaluatorEntry } from './entry';

export class StageEvaluatorService {
  private stageEvaluator: Model<StageEvaluatorModel>;

  constructor() {
    this.stageEvaluator = stageEvaluatorSchema;
  }

  async save(model: StageEvaluatorEntry): Promise<StageEvaluatorModel> {
    return await new this.stageEvaluator(model).save();
  }
}
