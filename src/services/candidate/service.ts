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
    const foundCandidate = await this.candidate.findById(id);
    if (foundCandidate != null) {
      const updatedCandidate = {
        name: model.name,
        cpf: model.cpf,
        address: model.address,
        links: model.links,
        jobOpportunities: foundCandidate.jobOpportunities,
        base64Resume: foundCandidate.base64Resume,
        deleted: model.deleted != null ? model.deleted : foundCandidate.deleted,
        deleteReason: model.deleteReason != null ? model.deleteReason : foundCandidate.deleteReason,
      };
      await this.candidate.update({ _id: id }, updatedCandidate);
    }
    return await this.candidate.findById(id);
  }

  async delete(id: string, deleteReason: string): Promise<boolean> {
    const foundCandidate = await this.candidate.findById(id);
    if (foundCandidate != null && foundCandidate.deleted === false) {
      for (const f of foundCandidate.jobOpportunities) {
        await this.candidateJobOpportunityService.delete(f._id);
      }
      foundCandidate.deleteReason = deleteReason;
      foundCandidate.deleted = true;
      await this.update(foundCandidate._id, foundCandidate);
      return true;
    }
    return false;
  }

  async activate(id: string): Promise<boolean> {
    const foundCandidate = await this.candidate.findById(id);
    if (foundCandidate != null) {
      foundCandidate.deleteReason = '';
      foundCandidate.deleted = false;
      await this.update(foundCandidate._id, foundCandidate);
      return true;
    }
    return false;
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

  async findDeleted(): Promise<CandidateModel[]> {
    return await this.candidate.find({ deleted: true }).populate({
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
    if (candidate && candidate.deleted === false) {
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
    if (candidate && candidate.deleted === false) {
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
    if (candidate && candidate.deleted === false) {
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
