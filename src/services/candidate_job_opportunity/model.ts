import { Document, Types } from 'mongoose';
import { JobOpportunityModel } from '../job_opportunity/model';
import { StageEvaluatorModel } from '../stage_evaluator/model';

export interface CandidateJobOpportunityModel extends Document {
  jobOpportunity: JobOpportunityModel;
  stageEvaluatorList: Types.Array<StageEvaluatorModel>;
}
