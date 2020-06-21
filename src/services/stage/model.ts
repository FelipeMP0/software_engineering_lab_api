import { Document } from 'mongoose';
import { SkillModel } from '../skill/model';

export interface StageModel extends Document {
  name: string;
  description: string;
  skills: SkillModel[];
}
