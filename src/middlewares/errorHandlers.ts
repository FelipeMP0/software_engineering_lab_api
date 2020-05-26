import { Request, Response, NextFunction, Router } from 'express';
import * as ErrorHandler from '../utils/errorHandler';

const handle404Error = (router: Router): void => {
  router.use(() => {
    ErrorHandler.notFoundError();
  });
};

const handleClientError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    ErrorHandler.clientError(err, res, next);
  });
};

const handleServerError = (router: Router): void => {
  router.use((err: Error, req: Request, res: Response) => {
    ErrorHandler.serverError(err, res);
  });
};

export default [handle404Error, handleClientError, handleServerError];
