import { Model } from 'mongoose';
import { SkillModel } from './model';
import { skillSchema } from './schema';

export class SkillService {
  private skill: Model<SkillModel>;

  constructor() {
    this.skill = skillSchema;
  }

  async save(model: SkillModel): Promise<SkillModel> {
    return await new this.skill(model).save();
  }

  async update(id: string, model: SkillModel): Promise<SkillModel | null | undefined> {
    const skill = this.findById(id);
    if (skill) {
      const updateSkill = {
        name: model.name,
        description: model.description,
      };
      await this.skill.update({ _id: id }, updateSkill);
      return await this.findById(id);
    }
  }

  async findById(id: string): Promise<SkillModel | null> {
    return await this.skill.findById(id);
  }

  async findAll(): Promise<SkillModel[]> {
    return await this.skill.find();
  }

  async deleteById(id: string): Promise<void> {
    await this.skill.deleteOne({ _id: id });
  }
}
