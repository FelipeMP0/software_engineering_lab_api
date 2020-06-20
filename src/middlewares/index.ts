import { handleCors, handleBodyRequestParsing, handleCompression, handleLogger, handleAuth } from './common';
import { swagger } from './swagger';

export default [handleCors, handleBodyRequestParsing, handleCompression, handleLogger, handleAuth, swagger];
