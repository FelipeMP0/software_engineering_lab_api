import { Model } from 'mongoose';
import { JobOpportunityModel } from './model';
import { jobOpportunitySchema } from './schema';
import { StageModel } from '../stage/model';
import { StageService } from '../stage/service';
import { StageEvaluatorModel } from '../stage_evaluator/model';
import { stageEvaluatorSchema } from '../stage_evaluator/schema';
import { CandidateJobOpportunityService } from '../candidate_job_opportunity/service';
import { candidateSchema } from '../candidate/schema';
import { CandidateModel } from '../candidate/model';
import { candidateJobOpportunitySchema } from '../candidate_job_opportunity/schema';
import { CandidateJobOpportunityModel } from '../candidate_job_opportunity/model';

export class JobOpportunityService {
  private jobOpportunity: Model<JobOpportunityModel>;
  private stageService: StageService;
  private stageEvaluator: Model<StageEvaluatorModel>;
  private candidateJobOpportunity: Model<CandidateJobOpportunityModel>;
  private candidate: Model<CandidateModel>;

  constructor() {
    this.jobOpportunity = jobOpportunitySchema;
    this.stageService = new StageService();
    this.stageEvaluator = stageEvaluatorSchema;
    this.candidateJobOpportunity = candidateJobOpportunitySchema;
    this.candidate = candidateSchema;
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
        deleted: job.deleted,
        deleteReason: job.deleteReason,
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

  async findResultsById(id: string): Promise<JobOpportunityModel | null> {
    const candidateJobOpportunities = await this.candidateJobOpportunity.find({
      jobOpportunity: new Object(id),
    });
    const candidates = [];

    for (const c of candidateJobOpportunities) {
      const foundCandidate = await this.candidate.findOne({ jobOpportunities: c._id });
      candidates.push(foundCandidate);
    }
    return null;
  }

  async findDeleted(): Promise<JobOpportunityModel[]> {
    return await this.jobOpportunity.find({ deleted: true }).populate({ path: 'stages', populate: { path: 'skills' } });
  }

  async deleteById(id: string, deleteReason: string): Promise<boolean> {
    const foundJobOpportunity = await this.jobOpportunity.findById(id);
    console.log(foundJobOpportunity);
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
      console.log(foundJobOpportunity);
      await this.update(foundJobOpportunity._id, foundJobOpportunity);
      return true;
    }
    return false;
  }

  async saveStages(id: string, stage: StageModel): Promise<StageModel | null> {
    const jobOpportunity = await this.findById(id);
    if (jobOpportunity && jobOpportunity.deleted === false) {
      const newJob = {
        name: jobOpportunity.name,
        department: jobOpportunity.department,
        description: jobOpportunity.description,
        stages: jobOpportunity.stages,
      };
      const savedStage = await this.stageService.save(stage);
      const foundStage = this.stageService.findById(savedStage._id);
      newJob.stages.push(savedStage);
      await this.jobOpportunity.update({ _id: id }, newJob);
      return foundStage;
    }
    return null;
  }

  async findWithStageId(stageId: string): Promise<JobOpportunityModel | null> {
    return await this.jobOpportunity.findOne({ stages: stageId, deleted: false });
  }
}
