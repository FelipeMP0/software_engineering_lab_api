import { Router } from 'express';
import cors from 'cors';
import parser from 'body-parser';
import compression from 'compression';
import multer from 'multer';
import helmet from 'helmet';
import { requestLoggerMiddleware } from './log/logger';
import { basicAuthMiddleware } from './auth/auth';

export const handleCors = (router: Router): void => {
  router.use(cors({ credentials: true, origin: true }));
};

export const handleBodyRequestParsing = (router: Router): void => {
  const UPLOAD_PATH = 'uploads';
  router.use(parser.json({ limit: '50mb' }));
  router.use(parser.urlencoded({ extended: true, limit: '50mb' }));
  router.use(multer({ dest: `${UPLOAD_PATH}/`, storage: multer.memoryStorage() }).single('resume'));
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
