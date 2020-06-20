import mongoosh, { Schema } from 'mongoose';
import Department from '../department/model';
import { JobOpportunityModel } from './model';

const schema: Schema = new Schema(
  {
    id: Object,
    name: { type: String, required: true },
    description: { type: String, required: true },
    department: {
      type: String,
      required: true,
      enum: [Department.HR, Department.SOFTWARE_DEVELOPMENT, Department.SALES],
    },
  },
  { timestamps: true },
);

export const jobOpportunitySchema = mongoosh.model<JobOpportunityModel>('JOB_OPPORTUNITY', schema);
