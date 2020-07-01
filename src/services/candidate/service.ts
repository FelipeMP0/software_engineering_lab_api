import { CandidateModel } from './model';
import { Model } from 'mongoose';
import { candidateSchema } from './schema';
import { CandidateJobOpportunityEntry } from '../candidate_job_opportunity/entry';
import { CandidateJobOpportunityService } from '../candidate_job_opportunity/service';

export class CandidateService {
  private candidate: Model<CandidateModel>;
  private candidateJobOpportunityService: CandidateJobOpportunityService;

  constructor() {
    this.candidate = candidateSchema;
    this.candidateJobOpportunityService = new CandidateJobOpportunityService();
  }

  async save(model: CandidateModel): Promise<CandidateModel> {
    return await new this.candidate(model).save();
  }

  async update(id: string, model: CandidateModel): Promise<CandidateModel | null> {
    await this.candidate.update({ _id: id }, model);
    return await this.candidate.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const exists: boolean = await this.candidate.exists({ _id: id });
    if (exists) {
      await this.candidate.deleteOne({ _id: id });
    }
    return exists;
  }

  async findAll(): Promise<CandidateModel[]> {
    return await this.candidate.find().populate({
      path: 'jobOpportunities',
      populate: {
        path: 'jobOpportunity stageEvaluatorList',
        populate: { path: 'evaluator stage', populate: { path: 'skills' } },
      },
    });
  }

  async findById(id: string): Promise<CandidateModel | null> {
    return await this.candidate.findById(id).populate({
      path: 'jobOpportunities',
      populate: {
        path: 'jobOpportunity stageEvaluatorList',
        populate: { path: 'evaluator stage', populate: { path: 'skills' } },
      },
    });
  }

  async saveJobOpportunity(id: string, jobOpportunity: CandidateJobOpportunityEntry): Promise<CandidateModel | null> {
    const candidate = await this.findById(id);
    if (candidate) {
      const newCandidate = {
        name: candidate.name,
        cpf: candidate.cpf,
        address: candidate.address,
        links: candidate.links,
        jobOpportunities: candidate.jobOpportunities,
      };
      const savedJob = await this.candidateJobOpportunityService.save(jobOpportunity);
      newCandidate.jobOpportunities.push(savedJob);
      await this.candidate.update({ _id: id }, newCandidate);
      return await this.findById(id);
    }
    return candidate;
  }

  async uploadResume(id: string, file: Express.Multer.File): Promise<void> {
    const base64Resume: string = file.buffer.toString('base64');
    const candidate = await this.candidate.findById(id).select('+base64Resume');
    if (candidate) {
      const newCandidate = {
        name: candidate.name,
        cpf: candidate.cpf,
        address: candidate.address,
        links: candidate.links,
        jobOpportunities: candidate.jobOpportunities,
        base64Resume: base64Resume,
      };
      await this.candidate.update({ _id: id }, newCandidate);
    }
  }

  async downloadResume(id: string): Promise<string | undefined> {
    const candidate = await this.candidate.findById(id).select('+base64Resume -_id');
    if (candidate) {
      return candidate.base64Resume;
    }
  }

  async deleteResume(id: string): Promise<CandidateModel | null> {
    let candidate = await this.candidate.findById(id).select('+base64Resume');
    if (candidate) {
      const newCandidate = {
        name: candidate.name,
        cpf: candidate.cpf,
        address: candidate.address,
        links: candidate.links,
        jobOpportunities: candidate.jobOpportunities,
        base64Resume: '',
      };
      await this.candidate.update({ _id: id }, newCandidate);
      candidate = await this.findById(id);
    }
    return candidate;
  }

  async findWithStageEvaluatorId(id: string): Promise<CandidateModel | null> {
    const candidateJobOpportunity = await this.candidateJobOpportunityService.findWithStageEvaluatorId(id);
    return await this.candidate.findOne({ jobOpportunities: candidateJobOpportunity?._id });
  }
}
