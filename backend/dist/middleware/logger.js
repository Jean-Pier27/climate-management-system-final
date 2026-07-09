"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (req) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
};
exports.default = logger;
