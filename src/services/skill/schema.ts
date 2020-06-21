import mongoosh, { Schema } from 'mongoose';
import { SkillModel } from './model';

const schema: Schema = new Schema(
  {
    id: Object,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
  },
  { timestamps: true },
);

export const skillSchema = mongoosh.model<SkillModel>('SKILL', schema);
