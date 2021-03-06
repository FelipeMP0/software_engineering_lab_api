import { Model } from 'mongoose';
import { UserModel, Role } from './model';
import { userSchema } from './schema';
import { Base64 } from 'js-base64';

export class UserService {
  private user: Model<UserModel>;

  constructor() {
    this.user = userSchema;
  }

  async save(model: UserModel): Promise<UserModel> {
    return await new this.user(model).save();
  }

  async authenticate(auth: string): Promise<UserModel | null> {
    const decodeAuth = Base64.decode(auth);
    const usernameAndPassword = decodeAuth.split(':');
    const username = usernameAndPassword[0];
    const password = usernameAndPassword[1];
    return await this.user.findOne({ username: username, password: password });
  }

  async findAllEvaluators(): Promise<UserModel[]> {
    return await this.user.find();
  }

  async findByToken(authToken: string): Promise<UserModel | null> {
    authToken = authToken.replace('Basic ', '');
    return this.authenticate(authToken);
  }
}
