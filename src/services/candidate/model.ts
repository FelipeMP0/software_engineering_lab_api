import { Document, Types } from 'mongoose';
import { CandidateJobOpportunityModel } from '../candidate_job_opportunity/model';

export interface CandidateModel extends Document {
  name: string;
  cpf: string;
  address: string;
  links: string[];
  jobOpportunities: Types.Array<CandidateJobOpportunityModel>;
  base64Resume: string;
}
