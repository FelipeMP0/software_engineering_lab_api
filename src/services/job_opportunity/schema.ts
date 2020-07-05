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
    stages: [{ type: Schema.Types.ObjectId, ref: 'STAGE' }],
    deleted: { type: Boolean, default: false },
    deleteReason: { type: String },
  },
  { timestamps: true },
);

export const jobOpportunitySchema = mongoosh.model<JobOpportunityModel>('JOB_OPPORTUNITY', schema);
