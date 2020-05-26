import { Model } from 'mongoose';
import { TestModel } from './model';
import { testSchema } from './schema';

export class TestService {
  private test: Model<TestModel>;

  constructor() {
    this.test = testSchema;
  }

  async save(model: TestModel): Promise<TestModel> {
    return await new this.test(model).save();
  }

  async findAll(): Promise<TestModel[]> {
    return await this.test.find();
  }
}
