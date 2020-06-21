import mongoosh, { Schema } from 'mongoose';
import { CandidateJobOpportunityModel } from './model';

const schema: Schema = new Schema(
  {
    id: Object,
    jobOpportunity: { type: Schema.Types.ObjectId, ref: 'JOB_OPPORTUNITY', required: true },
    stageEvaluatorList: [{ type: Schema.Types.ObjectId, ref: 'STAGE_EVALUATOR', required: true }],
  },
  { timestamps: true },
);

export const candidateJobOpportunitySchema = mongoosh.model<CandidateJobOpportunityModel>(
  'CANDIDATE_JOB_OPPORTUNITY',
  schema,
);
