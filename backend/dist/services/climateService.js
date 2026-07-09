"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ClimateRecord_1 = __importDefault(require("../models/ClimateRecord"));
const climateRepository_1 = __importDefault(require("../repositories/climateRepository"));
const getAllRecords = () => {
    return climateRepository_1.default.getAll();
};
const getRecordById = (id) => {
    return climateRepository_1.default.getById(id);
};
const createRecord = (data) => {
    const record = new ClimateRecord_1.default(Date.now(), data.city, data.temperature, data.humidity, data.pressure, data.date);
    return climateRepository_1.default.create(record);
};
const updateRecord = (id, data) => {
    return climateRepository_1.default.update(id, data);
};
const deleteRecord = (id) => {
    return climateRepository_1.default.remove(id);
};
exports.default = {
    getAllRecords,
    getRecordById,
    createRecord,
    updateRecord,
    deleteRecord,
};
