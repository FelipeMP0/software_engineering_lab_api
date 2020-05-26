"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DBConfig = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const dbUrl = process.env.MONGO_DB_URL;
class DBConfig {
    constructor() {
        this.openConnection = async () => {
            await mongoose_1.default.connect(dbUrl, { useNewUrlParser: true }).catch((err) => {
                console.log(`something went wrong ${err}`);
            });
            console.log(`Successfully`);
        };
        this.openConnection();
    }
}
exports.DBConfig = DBConfig;
//# sourceMappingURL=DbConfig.js.map