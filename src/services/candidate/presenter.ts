import { CandidateJobOpportunityModel } from '../candidate_job_opportunity/model';
import { CandidateModel } from './model';

export interface CandidatePresenter {
  _id: string;
  name: string;
  cpf: string;
  address: string;
  links: string[];
  jobOpportunities: CandidateJobOpportunityModel[];
  hasResume: boolean;
  deleted: boolean;
  deleteReason: string;
}

export const toCandidatePresenter = (model: CandidateModel): CandidatePresenter => {
  let hasResume = false;
  if (model.base64Resume != null && model.base64Resume !== '') {
    hasResume = true;
  }
  const result: CandidatePresenter = {
    _id: model._id,
    name: model.name,
    cpf: model.cpf,
    address: model.address,
    links: model.links,
    jobOpportunities: model.jobOpportunities,
    hasResume: hasResume,
    deleted: model.deleted,
    deleteReason: model.deleteReason,
  };
  return result;
};
