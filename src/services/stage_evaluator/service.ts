import { Model } from 'mongoose';
import { StageEvaluatorModel } from './model';
import { stageEvaluatorSchema } from './schema';
import { StageEvaluatorEntry } from './entry';
import { UserService } from '../user/service';
import { JobOpportunityService } from '../job_opportunity/service';
import { JobOpportunityModel } from '../job_opportunity/model';
import { SkillModel } from '../skill/model';

export class StageEvaluatorService {
  private stageEvaluator: Model<StageEvaluatorModel>;
  private userService: UserService;
  private jobOpportunityService: JobOpportunityService;

  constructor() {
    this.stageEvaluator = stageEvaluatorSchema;
    this.userService = new UserService();
    this.jobOpportunityService = new JobOpportunityService();
  }

  async save(model: StageEvaluatorEntry): Promise<StageEvaluatorModel> {
    return await new this.stageEvaluator(model).save();
  }

  async findByEvaluatorAuthToken(authToken: string): Promise<StageEvaluatorModel[] | undefined> {
    const user = await this.userService.authenticate(authToken);

    if (user != null) {
      return await this.stageEvaluator.find({ evaluator: user._id }).populate({ path: 'stage' });
    }
  }

  async findJobOpportunity(id: string): Promise<JobOpportunityModel | null> {
    const evaluation = await this.stageEvaluator.findById(id);
    return await this.jobOpportunityService.findWithStageId(evaluation?.stage._id);
  }

  async findSkillsForId(id: string): Promise<SkillModel[]> {
    const result = await this.stageEvaluator.findById(id).populate({ path: 'stage', populate: { path: 'skills' } });
    if (result) {
      return result?.stage.skills;
    }
    return new Array<SkillModel>();
  }
}
