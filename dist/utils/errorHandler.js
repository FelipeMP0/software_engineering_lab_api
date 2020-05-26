"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverError = exports.clientError = exports.notFoundError = void 0;
const httpErrors_1 = require("../utils/httpErrors");
exports.notFoundError = () => {
    throw new httpErrors_1.HTTP404Error('Method not found.');
};
exports.clientError = (err, res, next) => {
    if (err instanceof httpErrors_1.HTTPClientError) {
        console.warn(err);
        res.status(err.statusCode).send(err.message);
    }
    else {
        next(err);
    }
};
exports.serverError = (err, res) => {
    console.error(err);
    if (process.env.NODE_ENV === 'production') {
        res.status(500).send('Internal Server Error');
    }
    else {
        res.status(500).send(err.stack);
    }
};
//# sourceMappingURL=errorHandler.js.map