"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const service_1 = require("./service");
class TestController {
    constructor() {
        this.save = async (req, res) => {
            const result = await this.testService.save(req.body);
            res.status(201).json(result);
        };
        this.findAll = async (_req, res) => {
            const testList = await this.testService.findAll();
            return await res.status(200).json({
                data: testList,
            });
        };
        this.testService = new service_1.TestService();
    }
}
exports.TestController = TestController;
//# sourceMappingURL=controller.js.map