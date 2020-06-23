import { Request, Response, NextFunction } from 'express';
import { UserService } from '../../services/user/service';

const basicAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.url === '/users' || (req.url.endsWith('/resume') && req.method === 'GET')) {
    next();
    return;
  }
  const basicAuth = req.headers['authorization']!;
  if (!basicAuth) {
    res.status(401).send('authentication error');
    return;
  }
  if (!basicAuth.startsWith('Basic ')) {
    res.status(401).send('authentication error');
    return;
  }
  const userService = new UserService();
  const userModel = await userService.authenticate(basicAuth.replace('Basic ', ''));
  if (userModel != null) {
    next();
  } else {
    res.status(401).send('authentication error');
  }
};

export { basicAuthMiddleware };
