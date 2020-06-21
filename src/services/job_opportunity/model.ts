import { Document } from 'mongoose';
import Department from '../department/model';
import { StageModel } from '../stage/model';

export interface JobOpportunityModel extends Document {
  name: string;
  department: Department;
  description: string;
  stages: StageModel[];
}
