import mongoosh, { Schema } from 'mongoose';
import { CandidateModel } from './model';

const candidadeSchemaDefinition: Schema = new Schema(
  {
    id: Object,
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    links: [{ type: String, required: true }],
    jobOpportunities: [{ type: Schema.Types.ObjectId, ref: 'CANDIDATE_JOB_OPPORTUNITY', uniqueItems: true }],
  },
  { timestamps: true },
);

export const candidateSchema = mongoosh.model<CandidateModel>('CANDIDATE', candidadeSchemaDefinition);
