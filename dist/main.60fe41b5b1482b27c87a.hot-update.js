exports.id = "main";
exports.modules = {

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\n * Required External Modules\n */\nvar __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });\n}) : (function(o, m, k, k2) {\n    if (k2 === undefined) k2 = k;\n    o[k2] = m[k];\n}));\nvar __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {\n    Object.defineProperty(o, \"default\", { enumerable: true, value: v });\n}) : function(o, v) {\n    o[\"default\"] = v;\n});\nvar __importStar = (this && this.__importStar) || function (mod) {\n    if (mod && mod.__esModule) return mod;\n    var result = {};\n    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);\n    __setModuleDefault(result, mod);\n    return result;\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nvar dotenv = __importStar(__webpack_require__(/*! dotenv */ \"dotenv\"));\nvar express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nvar cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nvar helmet_1 = __importDefault(__webpack_require__(/*! helmet */ \"helmet\"));\nvar request_logger_middleware_1 = __webpack_require__(/*! ./request.logger.middleware */ \"./src/request.logger.middleware.ts\");\ndotenv.config();\n/**\n * App Variables\n */\nif (!process.env.PORT) {\n    process.exit(1);\n}\nvar PORT = parseInt(process.env.PORT);\nvar app = express_1.default();\n/**\n *  App Configuration\n */\napp.use(helmet_1.default());\napp.use(cors_1.default());\napp.use(express_1.default.json());\napp.use(request_logger_middleware_1.requestLoggerMiddleware);\n/**\n * Server Activation\n */\nvar server = app.listen(PORT, function () {\n    console.log(\"Listening on port \" + PORT);\n});\nif (true) {\n    module.hot.accept();\n    module.hot.dispose(function () { return server.close(); });\n}\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "./src/request.logger.middleware.ts":
/*!******************************************!*\
  !*** ./src/request.logger.middleware.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.requestLoggerMiddleware = void 0;\nvar requestLoggerMiddleware = function (req, res, next) {\n    console.info(req.method + \" \" + req.originalUrl);\n    var start = new Date().getTime();\n    res.on('finish', function () {\n        var elapsed = new Date().getTime() - start;\n        var msg = req.method + \" \" + req.originalUrl + \" \" + res.statusCode + \" \" + elapsed + \"ms\";\n        console.info(msg);\n    });\n    next();\n};\nexports.requestLoggerMiddleware = requestLoggerMiddleware;\n\n\n//# sourceURL=webpack:///./src/request.logger.middleware.ts?");

/***/ })

};