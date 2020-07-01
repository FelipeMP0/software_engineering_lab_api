import mongoosh, { Schema } from 'mongoose';
import { SkillEvaluationModel, SkillScoreModel } from './model';

const skillEvaluationSchemaModel = new Schema(
  {
    id: Object,
    stageEvaluator: { type: Schema.Types.ObjectId, ref: 'STAGE_EVALUATOR', required: true },
    skillScoreList: [{ type: Schema.Types.ObjectId, ref: 'SKILL_SCORE', required: true }],
  },
  { timestamps: true },
);

const skillScoreSchemaModel = new Schema(
  {
    id: Object,
    skill: { type: Schema.Types.ObjectId, ref: 'SKILL', required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true },
);

export const skillEvaluationSchema = mongoosh.model<SkillEvaluationModel>(
  'SKILL_EVALUATION',
  skillEvaluationSchemaModel,
);

export const skillScoreSchema = mongoosh.model<SkillScoreModel>('SKILL_SCORE', skillScoreSchemaModel);
