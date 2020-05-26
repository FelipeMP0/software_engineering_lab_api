"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TestController_1 = require("./TestController");
exports.default = [
    {
        path: '/',
        method: 'get',
        handler: async (req, res) => {
            const test = TestController_1.saveTest();
            res.status(201).send(test);
        },
    },
];
//# sourceMappingURL=routes.js.map