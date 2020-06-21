import { StageEvaluatorEntry } from '../stage_evaluator/entry';

export interface CandidateJobOpportunityEntry {
  jobOpportunityId: string;
  stageEvaluatorList: StageEvaluatorEntry[];
}
