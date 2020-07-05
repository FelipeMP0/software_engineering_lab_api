import { StageModel } from '../stage/model';
import { UserModel } from '../user/model';
import { JobOpportunityModel } from '../job_opportunity/model';
import { CandidateModel } from '../candidate/model';
import { StageEvaluatorModel } from './model';
import { CandidatePresenter, toCandidatePresenter } from '../candidate/presenter';

export interface StageEvaluatorPresenter {
  _id: string;
  stage: StageModel;
  evaluator: UserModel;
  jobOpportunity: JobOpportunityModel;
  candidate: CandidatePresenter;
}

export const toStageEvaluatorPresenter = (
  stageEvaluator: StageEvaluatorModel,
  jobOpportunity: JobOpportunityModel,
  candidate: CandidateModel,
): StageEvaluatorPresenter => {
  const presenter: StageEvaluatorPresenter = {
    _id: stageEvaluator._id,
    stage: stageEvaluator.stage,
    evaluator: stageEvaluator.evaluator,
    jobOpportunity: jobOpportunity,
    candidate: toCandidatePresenter(candidate),
  };
  return presenter;
};
