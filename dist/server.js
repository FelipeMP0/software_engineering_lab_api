"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
process.on('uncaughtException', (e) => {
    console.log(e);
    process.exit(1);
});
process.on('unhandledRejection', (e) => {
    console.log(e);
    process.exit(1);
});
const port = process.env.PORT;
app_1.default.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=server.js.map