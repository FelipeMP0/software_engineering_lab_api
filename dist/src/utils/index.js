"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRoutes = exports.applyMiddleware = void 0;
exports.applyMiddleware = (middleware, router) => {
    for (const f of middleware) {
        f(router);
    }
};
exports.applyRoutes = (routes, router) => {
    for (const route of routes) {
        const { method, path, handler } = route;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        router[method](path, handler);
    }
};
//# sourceMappingURL=index.js.map