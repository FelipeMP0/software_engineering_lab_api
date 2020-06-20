import { Document } from 'mongoose';
import Department from '../department/model';

export interface JobOpportunityModel extends Document {
  name: string;
  department: Department;
  description: string;
}
