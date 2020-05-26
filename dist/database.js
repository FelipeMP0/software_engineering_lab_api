"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = void 0;
const promise_1 = require("mysql/promise");
async function connect() {
    return await promise_1.createPool();
}
exports.connect = connect;
//# sourceMappingURL=database.js.map