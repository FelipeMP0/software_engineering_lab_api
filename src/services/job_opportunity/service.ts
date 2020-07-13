import { Model } from 'mongoose';
import { JobOpportunityModel } from './model';
import { jobOpportunitySchema } from './schema';
import { StageModel } from '../stage/model';
import { StageService } from '../stage/service';
import { StageEvaluatorModel } from '../stage_evaluator/model';
import { stageEvaluatorSchema } from '../stage_evaluator/schema';
import { candidateSchema } from '../candidate/schema';
import { CandidateModel } from '../candidate/model';
import { candidateJobOpportunitySchema } from '../candidate_job_opportunity/schema';
import { CandidateJobOpportunityModel } from '../candidate_job_opportunity/model';
import {
  JobOpportunityResultPresenter,
  CandidateResultPresenter,
  CandidateJobOpportunityResultPresenter,
  StageEvaluatorResultPresenter,
  StageResultPresenter,
  SkillScoreResultPresenter,
  SkillResultPresenter,
  JobOpportunityPresenter,
} from './presenter';
import { toUserPresenter } from '../user/presenter';
import { SkillEvaluationModel } from '../skill_evaluation/model';
import { skillEvaluationSchema } from '../skill_evaluation/schema';

export class JobOpportunityService {
  private jobOpportunity: Model<JobOpportunityModel>;
  private stageService: StageService;
  private stageEvaluator: Model<StageEvaluatorModel>;
  private candidateJobOpportunity: Model<CandidateJobOpportunityModel>;
  private candidate: Model<CandidateModel>;
  private skillEvalutation: Model<SkillEvaluationModel>;

  constructor() {
    this.jobOpportunity = jobOpportunitySchema;
    this.stageService = new StageService();
    this.stageEvaluator = stageEvaluatorSchema;
    this.candidateJobOpportunity = candidateJobOpportunitySchema;
    this.candidate = candidateSchema;
    this.skillEvalutation = skillEvaluationSchema;
  }

  async save(model: JobOpportunityModel): Promise<JobOpportunityModel> {
    return await new this.jobOpportunity(model).save();
  }

  async update(id: string, model: JobOpportunityModel): Promise<JobOpportunityModel | null | undefined> {
    const job = await this.findById(id);
    if (job != null) {
      const updateJob = {
        name: model.name,
        description: model.description,
        department: model.department,
        stages: job?.stages,
        deleted: model.deleted != null ? model.deleted : job.deleted,
        deleteReason: model.deleteReason != null ? model.deleteReason : job.deleteReason,
        finished: model.finished != null ? model.finished : job.finished,
      };
      await this.jobOpportunity.update({ _id: id }, updateJob);
      return await this.findById(id);
    }
  }

  async findById(id: string): Promise<JobOpportunityModel | null> {
    return await this.jobOpportunity.findById(id).populate({ path: 'stages', populate: { path: 'skills' } });
  }

  async findAll(): Promise<JobOpportunityPresenter[]> {
    const jobs = await this.jobOpportunity.find().populate({ path: 'stages', populate: { path: 'skills' } });

    const newJobs = [];
    for (const j of jobs) {
      const stageIds = [];
      for (const s of j.stages) {
        stageIds.push(s._id);
      }
      const canFinish1 = await this.stageEvaluator.exists({ _id: { $in: stageIds }, done: false });

      const a: JobOpportunityPresenter = {
        _id: j._id,
        name: j.name,
        department: j.department,
        description: j.description,
        stages: j.stages,
        deleted: j.deleted,
        deleteReason: j.deleteReason,
        finished: j.finished,
        canFinish: !canFinish1,
      };

      newJobs.push(a);
    }
    return newJobs;
  }

  async findResultsById(id: string): Promise<JobOpportunityResultPresenter | null> {
    const foundJobOpportunity = await this.findById(id);
    if (foundJobOpportunity != null) {
      const candidateJobOpportunities = await this.candidateJobOpportunity
        .find({
          jobOpportunity: new Object(id),
        })
        .populate({ path: 'stageEvaluatorList', populate: { path: 'stage evaluator' } });
      const candidates = [];

      for (const c of candidateJobOpportunities) {
        const foundCandidate = await this.candidate.findOne({ jobOpportunities: c._id }).populate({
          path: 'jobOpportunity',
          populate: { path: 'stageEvaluatorList', populate: { path: 'stage evaluator' } },
        });
        candidates.push({ foundCandidate, jobOpportunity: c });
      }

      const candidatesPresenters: CandidateResultPresenter[] = [];

      for (const c of candidates) {
        if (c != null && c.foundCandidate != null && c.jobOpportunity != null) {
          const stageEvaluatorPresenters: StageEvaluatorResultPresenter[] = [];
          for (const s of c.jobOpportunity.stageEvaluatorList) {
            const skillEvaluation = await this.skillEvalutation
              .findOne({ stageEvaluator: s._id })
              .populate({ path: 'skillScoreList', populate: { path: 'skill' } });
            console.log(c);
            const stagePresenter: StageResultPresenter = {
              name: s.stage.name,
              description: s.stage.description,
            };
            const skillEvaluationPresenters: SkillScoreResultPresenter[] = [];
            if (skillEvaluation != null) {
              for (const sk of skillEvaluation.skillScoreList) {
                console.log(sk.skill);
                const skillPresenter: SkillResultPresenter = {
                  name: sk.skill.name,
                  description: sk.skill.description,
                };
                const skillEvaluationPresenter: SkillScoreResultPresenter = {
                  skill: skillPresenter,
                  score: sk.score,
                };
                skillEvaluationPresenters.push(skillEvaluationPresenter);
              }
            }
            const stageEvaluatorPresenter: StageEvaluatorResultPresenter = {
              stage: stagePresenter,
              evaluator: toUserPresenter(s.evaluator),
              done: s.done,
              skillEvaluations: skillEvaluationPresenters,
            };
            stageEvaluatorPresenters.push(stageEvaluatorPresenter);
          }
          const candidateJobOpportunityPresenter: CandidateJobOpportunityResultPresenter = {
            stageEvaluatorList: stageEvaluatorPresenters,
          };
          console.log(c.foundCandidate);
          const candidatePresenter: CandidateResultPresenter = {
            _id: c.foundCandidate._id,
            name: c.foundCandidate.name,
            cpf: c.foundCandidate.cpf,
            address: c.foundCandidate.address,
            links: c.foundCandidate.links,
            jobOpportunities: candidateJobOpportunityPresenter,
          };
          candidatesPresenters.push(candidatePresenter);
        }
      }

      const result: JobOpportunityResultPresenter = {
        _id: foundJobOpportunity._id,
        name: foundJobOpportunity.name,
        department: foundJobOpportunity.department,
        description: foundJobOpportunity.description,
        candidates: candidatesPresenters,
      };
      return result;
    }
    return null;
  }

  async findDeleted(): Promise<JobOpportunityModel[]> {
    return await this.jobOpportunity.find({ deleted: true }).populate({ path: 'stages', populate: { path: 'skills' } });
  }

  async deleteById(id: string, deleteReason: string): Promise<boolean> {
    const foundJobOpportunity = await this.jobOpportunity.findById(id);
    if (foundJobOpportunity != null) {
      for (const s of foundJobOpportunity.stages) {
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

  async activate(id: string): Promise<boolean> {
    const foundJobOpportunity = await this.jobOpportunity.findById(id);
    if (foundJobOpportunity != null) {
      foundJobOpportunity.deleted = false;
      foundJobOpportunity.deleteReason = '';
      await this.update(foundJobOpportunity._id, foundJobOpportunity);
      return true;
    }
    return false;
  }

  async finish(id: string): Promise<boolean> {
    const foundJobOpportunity = await this.jobOpportunity.findById(id);
    if (foundJobOpportunity != null) {
      foundJobOpportunity.finished = true;
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
    return await this.jobOpportunity.findOne({ stages: stageId });
  }
}
