import { Model } from 'mongoose';
import { JobOpportunityModel } from './model';
import { jobOpportunitySchema } from './schema';

export class JobOpportunityService {
  private jobOpportunity: Model<JobOpportunityModel>;

  constructor() {
    this.jobOpportunity = jobOpportunitySchema;
  }

  async save(model: JobOpportunityModel): Promise<JobOpportunityModel> {
    console.log(model);
    return await new this.jobOpportunity(model).save();
  }

  async findById(id: string): Promise<JobOpportunityModel | null> {
    return await this.jobOpportunity.findById(id);
  }

  async findAll(): Promise<JobOpportunityModel[]> {
    return await this.jobOpportunity.find();
  }

  async deleteById(id: string): Promise<void> {
    await this.jobOpportunity.deleteOne({ _id: id });
  }
}
