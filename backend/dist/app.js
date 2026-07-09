"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const climateRoutes_1 = __importDefault(require("./routes/climateRoutes"));
const logger_1 = __importDefault(require("./middleware/logger"));
const server = http.createServer((req, res) => {
    (0, logger_1.default)(req);
    // API
    if (req.url?.startsWith('/api')) {
        const routeHandled = (0, climateRoutes_1.default)(req, res);
        if (!routeHandled) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({
                message: 'Ruta no encontrada',
            }));
        }
        return;
    }
    // HTML principal
    if (req.url === '/') {
        const filePath = path.join(__dirname, '../public/index.html');
        console.log(filePath);
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                return res.end('Error cargando index.html');
            }
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.end(data);
        });
        return;
    }
    // CSS
    if (req.url === '/styles.css') {
        const filePath = path.join(__dirname, '../public/styles.css');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end();
            }
            res.writeHead(200, {
                'Content-Type': 'text/css',
            });
            res.end(data);
        });
        return;
    }
    // JS
    if (req.url === '/app.js') {
        const filePath = path.join(__dirname, '../public/app.js');
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end();
            }
            res.writeHead(200, {
                'Content-Type': 'application/javascript',
            });
            res.end(data);
        });
        return;
    }
    res.writeHead(404);
    res.end('Página no encontrada');
});
server.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000');
});
