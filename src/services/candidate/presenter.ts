import { CandidateJobOpportunityModel } from '../candidate_job_opportunity/model';

export interface CandidatePresenter {
  _id: string;
  name: string;
  cpf: string;
  address: string;
  links: string[];
  jobOpportunities: CandidateJobOpportunityModel[];
  hasResume: boolean;
}
