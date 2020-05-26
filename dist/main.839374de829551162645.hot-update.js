exports.id = "main";
exports.modules = {

/***/ "./src/middlewares/request.logger.middleware.ts":
/*!******************************************************!*\
  !*** ./src/middlewares/request.logger.middleware.ts ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.requestLoggerMiddleware = void 0;\nvar requestLoggerMiddleware = function (req, res, next) {\n    console.info(req.method + \" \" + req.originalUrl);\n    var start = new Date().getTime();\n    res.on('finish', function () {\n        var elapsed = new Date().getTime() - start;\n        var msg = req.method + \" \" + req.originalUrl + \" \" + res.statusCode + \" \" + elapsed + \"ms\";\n        console.info(msg);\n    });\n    next();\n};\nexports.requestLoggerMiddleware = requestLoggerMiddleware;\n\n\n//# sourceURL=webpack:///./src/middlewares/request.logger.middleware.ts?");

/***/ })

};