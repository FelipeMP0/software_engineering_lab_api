"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRouter = void 0;
const controller_1 = require("./controller");
class TestRouter {
    constructor(app) {
        this.app = app;
        this.testController = new controller_1.TestController();
        this.initRoute();
    }
    initRoute() {
        this.app.get('/', this.testController.findAll);
        this.app.post('/', this.testController.save);
    }
}
exports.TestRouter = TestRouter;
//# sourceMappingURL=routes.js.map