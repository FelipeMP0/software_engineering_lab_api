import { Document } from 'mongoose';
import { StageModel } from '../stage/model';
import { UserModel } from '../user/model';

export interface StageEvaluatorModel extends Document {
  stage: StageModel;
  evaluator: UserModel;
}
