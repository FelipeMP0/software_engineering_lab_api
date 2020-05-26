"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestLoggerMiddleware = void 0;
const requestLoggerMiddleware = (req, res, next) => {
    console.info(`${req.method} ${req.originalUrl}`);
    const start = new Date().getTime();
    res.on('finish', () => {
        const elapsed = new Date().getTime() - start;
        const msg = `${req.method} ${req.originalUrl} ${res.statusCode} ${elapsed}ms`;
        console.info(msg);
    });
    next();
};
exports.requestLoggerMiddleware = requestLoggerMiddleware;
//# sourceMappingURL=logger.js.map