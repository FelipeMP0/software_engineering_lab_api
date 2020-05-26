"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const schema_1 = require("./schema");
class TestService {
    constructor() {
        this.test = schema_1.testSchema;
    }
    async save(model) {
        return await new this.test(model).save();
    }
    async findAll() {
        return await this.test.find();
    }
}
exports.TestService = TestService;
//# sourceMappingURL=service.js.map