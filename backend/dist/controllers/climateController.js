"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRecord = exports.updateRecord = exports.createRecord = exports.getRecordById = exports.getAllRecords = void 0;
const climateService_1 = __importDefault(require("../services/climateService"));
const getAllRecords = (req, res) => {
    const records = climateService_1.default.getAllRecords();
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(records));
};
exports.getAllRecords = getAllRecords;
const getRecordById = (req, res, id) => {
    const record = climateService_1.default.getRecordById(id);
    if (!record) {
        res.writeHead(404, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
            message: 'Registro no encontrado',
        }));
        return;
    }
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(record));
};
exports.getRecordById = getRecordById;
const createRecord = (req, res) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        if (!data.city ||
            data.temperature === undefined ||
            data.humidity === undefined ||
            data.pressure === undefined) {
            res.writeHead(400, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({
                message: 'Datos inválidos',
            }));
            return;
        }
        const record = climateService_1.default.createRecord(data);
        res.writeHead(201, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(record));
    });
};
exports.createRecord = createRecord;
const updateRecord = (req, res, id) => {
    let body = '';
    req.on('data', (chunk) => {
        body += chunk.toString();
    });
    req.on('end', () => {
        const data = JSON.parse(body);
        if (!data.city ||
            data.temperature === undefined ||
            data.humidity === undefined ||
            data.pressure === undefined) {
            res.writeHead(400, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({
                message: 'Datos inválidos',
            }));
            return;
        }
        const updated = climateService_1.default.updateRecord(id, data);
        if (!updated) {
            res.writeHead(404, {
                'Content-Type': 'application/json',
            });
            res.end(JSON.stringify({
                message: 'Registro no encontrado',
            }));
            return;
        }
        res.writeHead(200, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(updated));
    });
};
exports.updateRecord = updateRecord;
const deleteRecord = (req, res, id) => {
    const deleted = climateService_1.default.deleteRecord(id);
    if (!deleted) {
        res.writeHead(404, {
            'Content-Type': 'application/json',
        });
        res.end(JSON.stringify({
            message: 'Registro no encontrado',
        }));
        return;
    }
    res.writeHead(200, {
        'Content-Type': 'application/json',
    });
    res.end(JSON.stringify({
        message: 'Registro eliminado correctamente',
    }));
};
exports.deleteRecord = deleteRecord;
