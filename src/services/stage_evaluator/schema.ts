import mongoosh, { Schema } from 'mongoose';
import { StageEvaluatorModel } from './model';

const stageEvaluatorSchemaDefinition: Schema = new Schema(
  {
    id: Object,
    stage: { type: Schema.Types.ObjectId, ref: 'STAGE', required: true },
    evaluator: { type: Schema.Types.ObjectId, ref: 'USER', required: true },
    done: { type: Boolean, default: false, required: true },
  },
  { timestamps: true },
);

export const stageEvaluatorSchema = mongoosh.model<StageEvaluatorModel>(
  'STAGE_EVALUATOR',
  stageEvaluatorSchemaDefinition,
);
