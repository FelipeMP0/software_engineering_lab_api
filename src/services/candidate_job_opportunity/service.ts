import { CandidateJobOpportunityModel } from './model';
import { Model } from 'mongoose';
import { candidateJobOpportunitySchema } from './schema';
import { CandidateJobOpportunityEntry } from './entry';
import { StageEvaluatorService } from '../stage_evaluator/service';
import { JobTest } from './test';

export class CandidateJobOpportunityService {
  private candidateJobOpportunity: Model<CandidateJobOpportunityModel>;
  private stageEvaluatorService: StageEvaluatorService;

  constructor() {
    this.candidateJobOpportunity = candidateJobOpportunitySchema;
    this.stageEvaluatorService = new StageEvaluatorService();
  }

  async save(model: CandidateJobOpportunityEntry): Promise<CandidateJobOpportunityModel> {
    const list = [];
    for (const c of model.stageEvaluatorList) {
      list.push(await (await this.stageEvaluatorService.save(c))._id);
    }
    const a: JobTest = {
      jobOpportunity: model.jobOpportunityId,
      stageEvaluatorList: list,
    };
    return await new this.candidateJobOpportunity(a).save();
  }

  async delete(id: string): Promise<boolean> {
    const exists: boolean = await this.candidateJobOpportunity.exists({ _id: id });
    if (exists) {
      await this.candidateJobOpportunity.deleteOne({ _id: id });
    }
    return exists;
  }

  async findWithStageEvaluatorId(stageEvaluatorId: string): Promise<CandidateJobOpportunityModel | null> {
    return await this.candidateJobOpportunity.findOne({ stageEvaluatorList: stageEvaluatorId });
  }
}
