import { Document } from 'mongoose';

export interface SkillModel extends Document {
  name: string;
  description: string;
}
