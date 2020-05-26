import { Router } from 'express';

type Wrapper = (router: Router) => void;

export const applyMiddleware = (middleware: Wrapper[], router: Router): void => {
  for (const f of middleware) {
    f(router);
  }
};
