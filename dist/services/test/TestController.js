"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestController = void 0;
const TestService_1 = require("./TestService");
class TestController {
    constructor(app) {
        this.app = app;
        this.testService = new TestService_1.TestService();
        this.routes();
    }
    test(req, res) {
        const result = this.testService.test();
        res.status(200).send(result);
    }
    routes() {
        this.app.route('/').get(this.test);
    }
}
exports.TestController = TestController;
//# sourceMappingURL=TestController.js.map