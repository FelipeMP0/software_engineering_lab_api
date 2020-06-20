import { Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import { requestLoggerMiddleware } from './log/logger';
import { basicAuthMiddleware } from './auth/auth';

export const handleCors = (router: Router): void => {
  router.use(cors({ credentials: true, origin: true }));
};

export const handleBodyRequestParsing = (router: Router): void => {
  router.use(parser.urlencoded({ extended: true }));
  router.use(parser.json());
};

export const handleCompression = (router: Router): void => {
  router.use(compression());
};

export const handleHelmet = (router: Router): void => {
  router.use(helmet);
};

export const handleLogger = (router: Router): void => {
  router.use(requestLoggerMiddleware);
};

export const handleAuth = (router: Router): void => {
  router.use(basicAuthMiddleware);
};
