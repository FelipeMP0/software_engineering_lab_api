import { Document } from 'mongoose';
import { CandidateJobOpportunityModel } from '../candidate_job_opportunity/model';

export interface CandidateModel extends Document {
  name: string;
  cpf: string;
  address: string;
  links: string[];
  jobOpportunities: CandidateJobOpportunityModel[];
}
