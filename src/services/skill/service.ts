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
    const skill = await this.findById(id);
    if (skill != null) {
      const updateSkill = {
        name: model.name,
        description: model.description,
        deleted: model.deleted != null ? model.deleted : skill.deleted,
        deleteReason: model.deleteReason != null ? model.deleteReason : skill.deleteReason,
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

  async deleteById(id: string, deleteReason: string): Promise<boolean> {
    const foundSkill = await this.skill.findById(id);
    if (foundSkill != null) {
      foundSkill.deleted = true;
      foundSkill.deleteReason = deleteReason;
      await this.update(foundSkill._id, foundSkill);
      return true;
    }
    return false;
  }

  async activate(id: string): Promise<boolean> {
    const foundSkill = await this.skill.findById(id);
    if (foundSkill != null) {
      foundSkill.deleted = false;
      foundSkill.deleteReason = '';
      await this.update(foundSkill._id, foundSkill);
      return true;
    }
    return false;
  }
}
