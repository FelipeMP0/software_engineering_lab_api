import { Model } from 'mongoose';
import { StageModel } from './model';
import { stageSchema } from './schema';
import { SkillService } from '../skill/service';
import { StageEntry } from './entry';

export class StageService {
  private stage: Model<StageModel>;
  private skillService: SkillService;

  constructor() {
    this.stage = stageSchema;
    this.skillService = new SkillService();
  }

  async save(stage: StageModel): Promise<StageModel> {
    return await new this.stage(stage).save();
  }

  async update(id: string, stage: StageModel): Promise<StageModel | null> {
    await this.stage.update({ _id: id }, stage);
    return await this.stage.findById(id).populate('skills');
  }

  async delete(id: string): Promise<boolean> {
    const exists: boolean = await this.stage.exists({ _id: id });
    if (exists) {
      await this.stage.deleteOne({ _id: id });
    }
    return exists;
  }
}
