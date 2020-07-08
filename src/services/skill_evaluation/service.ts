import { Model } from 'mongoose';
import { SkillEvaluationModel, SkillScoreModel } from './model';
import { skillEvaluationSchema, skillScoreSchema } from './schema';

export class SkillEvaluationService {
  private skillEvaluation: Model<SkillEvaluationModel>;
  private skillScore: Model<SkillScoreModel>;

  constructor() {
    this.skillEvaluation = skillEvaluationSchema;
    this.skillScore = skillScoreSchema;
  }

  async save(model: SkillEvaluationModel): Promise<SkillEvaluationModel | null> {
    const skillScoreList = model.skillScoreList;
    const savedSkillScoreIdList = [];
    for (const index in skillScoreList) {
      const savedSkillScore: SkillScoreModel = await new this.skillScore(skillScoreList[index]).save();
      savedSkillScoreIdList.push(savedSkillScore._id);
    }
    const newModel = {
      stageEvaluator: model.stageEvaluator,
      skillScoreList: savedSkillScoreIdList,
    };
    const saved = await new this.skillEvaluation(newModel).save();
    return await this.skillEvaluation
      .findById(saved._id)
      .populate({ path: 'skillScoreList', populate: { path: 'skill' } });
  }
}
