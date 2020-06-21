import mongoosh, { Schema } from 'mongoose';
import { StageModel } from './model';

const schema: Schema = new Schema(
  {
    id: Object,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    skills: [{ type: Schema.Types.ObjectId, ref: 'SKILL', required: true, autopoulate: true }],
  },
  { timestamps: true },
);

export const stageSchema = mongoosh.model<StageModel>('STAGE', schema);
