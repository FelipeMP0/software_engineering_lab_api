import { Document, Types } from 'mongoose';
import { SkillModel } from '../skill/model';
import { StageEvaluatorModel } from '../stage_evaluator/model';

export interface SkillEvaluationModel extends Document {
  stageEvaluator: StageEvaluatorModel;
  skillScoreList: Types.Array<SkillScoreModel>;
}

export interface SkillScoreModel extends Document {
  skill: SkillModel;
  score: number;
}
