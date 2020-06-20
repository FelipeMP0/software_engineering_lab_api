import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export const swagger = (router: Router): void => {
  const swaggerDocument = YAML.load('./src/middlewares/swagger/swagger-config.yaml');
  router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default [swagger];
