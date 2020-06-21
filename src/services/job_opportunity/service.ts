import { Model } from 'mongoose';
import { JobOpportunityModel } from './model';
import { jobOpportunitySchema } from './schema';
import { StageModel } from '../stage/model';
import { StageService } from '../stage/service';
import { StageEntry } from '../stage/entry';

export class JobOpportunityService {
  private jobOpportunity: Model<JobOpportunityModel>;
  private stageService: StageService;

  constructor() {
    this.jobOpportunity = jobOpportunitySchema;
    this.stageService = new StageService();
  }

  async save(model: JobOpportunityModel): Promise<JobOpportunityModel> {
    return await new this.jobOpportunity(model).save();
  }

  async update(id: string, model: JobOpportunityModel): Promise<JobOpportunityModel | null | undefined> {
    const job = await this.findById(id);
    if (job) {
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
    return await this.jobOpportunity.find().populate({ path: 'stages', populate: { path: 'skills' } });
  }

  async deleteById(id: string): Promise<void> {
    await this.jobOpportunity.deleteOne({ _id: id });
  }

  async saveStages(id: string, stage: StageModel): Promise<JobOpportunityModel | null | undefined> {
    const jobOpportunity = await this.findById(id);
    if (jobOpportunity) {
      const newJob = {
        name: jobOpportunity.name,
        department: jobOpportunity.department,
        description: jobOpportunity.description,
        stages: jobOpportunity.stages ? jobOpportunity.stages : new Array<StageModel>(),
      };
      const savedStage = await this.stageService.save(stage);
      newJob.stages.push(savedStage);
      await this.jobOpportunity.update({ _id: id }, newJob);
      return await this.findById(id);
    }
  }
}
