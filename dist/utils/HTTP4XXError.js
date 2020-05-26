"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP404Error = exports.HTTP400Error = void 0;
const httpErrors_1 = require("./httpErrors");
class HTTP400Error extends httpErrors_1.HTTPClientError {
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(message = 'Bad Request') {
        super(message);
        this.statusCode = 400;
    }
}
exports.HTTP400Error = HTTP400Error;
class HTTP404Error extends httpErrors_1.HTTPClientError {
    // eslint-disable-next-line @typescript-eslint/ban-types
    constructor(message = 'Not found') {
        super(message);
        this.statusCode = 404;
    }
}
exports.HTTP404Error = HTTP404Error;
//# sourceMappingURL=HTTP4XXError.js.map