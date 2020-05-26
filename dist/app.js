"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("./utils");
const middlewares_1 = __importDefault(require("./middlewares"));
const errorHandlers_1 = __importDefault(require("./middlewares/errorHandlers"));
const routes_1 = require("./services/test/routes");
const DbConfig_1 = require("./config/DbConfig");
class App {
    constructor() {
        this.app = express_1.default();
        this.configure();
    }
    configure() {
        utils_1.applyMiddleware(middlewares_1.default, this.app);
        this.setRoutes();
        utils_1.applyMiddleware(errorHandlers_1.default, this.app);
        new DbConfig_1.DBConfig();
    }
    setRoutes() {
        new routes_1.TestRouter(this.app);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map