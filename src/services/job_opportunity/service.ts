import { Model } from 'mongoose';
import { JobOpportunityModel } from './model';
import { jobOpportunitySchema } from './schema';
import { StageModel } from '../stage/model';
import { StageService } from '../stage/service';
import { StageEvaluatorModel } from '../stage_evaluator/model';
import { stageEvaluatorSchema } from '../stage_evaluator/schema';

export class JobOpportunityService {
  private jobOpportunity: Model<JobOpportunityModel>;
  private stageService: StageService;
  private stageEvaluator: Model<StageEvaluatorModel>;

  constructor() {
    this.jobOpportunity = jobOpportunitySchema;
    this.stageService = new StageService();
    this.stageEvaluator = stageEvaluatorSchema;
  }

  async save(model: JobOpportunityModel): Promise<JobOpportunityModel> {
    return await new this.jobOpportunity(model).save();
  }

  async update(id: string, model: JobOpportunityModel): Promise<JobOpportunityModel | null | undefined> {
    const job = await this.findById(id);
    if (job && job.deleted === false) {
      const updateJob = {
        name: model.name,
        description: model.description,
        department: model.department,
        stages: job?.stages,
      };
      await this.jobOpportunity.update({ _id: id }, updateJob);
      return await this.findById(id);
    }
  }

  async findById(id: string): Promise<JobOpportunityModel | null> {
    return await this.jobOpportunity.findById(id).populate({ path: 'stages', populate: { path: 'skills' } });
  }

  async findAll(): Promise<JobOpportunityModel[]> {
    return await this.jobOpportunity
      .find({ deleted: false })
      .populate({ path: 'stages', populate: { path: 'skills' } });
  }

  async findDeleted(): Promise<JobOpportunityModel[]> {
    return await this.jobOpportunity.find({ deleted: true }).populate({ path: 'stages', populate: { path: 'skills' } });
  }

  async deleteById(id: string, deleteReason: string): Promise<boolean> {
    const foundJobOpportunity = await this.jobOpportunity.findById(id);
    if (foundJobOpportunity != null && foundJobOpportunity.deleted === false) {
      for (const s of foundJobOpportunity.stages) {
        await this.stageService.delete(s._id);
        const list = await this.stageEvaluator.find({ stage: new Object(id) });

        const ids = [];
        for (const l of list) {
          ids.push(l._id);
        }
        await this.stageEvaluator.deleteMany({ _id: { $in: ids } });
      }
      foundJobOpportunity.deleted = true;
      foundJobOpportunity.deleteReason = deleteReason;
      await this.update(foundJobOpportunity._id, foundJobOpportunity);
      return true;
    }
    return false;
  }

  async saveStages(id: string, stage: StageModel): Promise<JobOpportunityModel | null> {
    const jobOpportunity = await this.findById(id);
    if (jobOpportunity && jobOpportunity.deleted === false) {
      const newJob = {
        name: jobOpportunity.name,
        department: jobOpportunity.department,
        description: jobOpportunity.description,
        stages: jobOpportunity.stages,
      };
      const savedStage = await this.stageService.save(stage);
      newJob.stages.push(savedStage);
      await this.jobOpportunity.update({ _id: id }, newJob);
      return await this.findById(id);
    }
    return jobOpportunity;
  }

  async findWithStageId(stageId: string): Promise<JobOpportunityModel | null> {
    return await this.jobOpportunity.findOne({ stages: stageId, deleted: false });
  }
}
