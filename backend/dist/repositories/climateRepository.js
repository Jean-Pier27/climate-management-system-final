"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../data/database");
const getAll = () => database_1.climateRecords;
const getById = (id) => database_1.climateRecords.find((record) => record.id === id);
const create = (record) => {
    database_1.climateRecords.push(record);
    return record;
};
const update = (id, updatedData) => {
    const index = database_1.climateRecords.findIndex((record) => record.id === id);
    if (index === -1)
        return null;
    database_1.climateRecords[index] = {
        ...database_1.climateRecords[index],
        ...updatedData,
    };
    return database_1.climateRecords[index];
};
const remove = (id) => {
    const index = database_1.climateRecords.findIndex((record) => record.id === id);
    if (index === -1)
        return false;
    database_1.climateRecords.splice(index, 1);
    return true;
};
exports.default = {
    getAll,
    getById,
    create,
    update,
    remove,
};
