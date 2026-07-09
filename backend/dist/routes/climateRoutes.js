"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const climateController_1 = require("../controllers/climateController");
const climateRoutes = (req, res) => {
    const urlParts = req.url?.split('/') || [];
    // GET ALL
    if (req.method === 'GET' && req.url === '/api/climate') {
        (0, climateController_1.getAllRecords)(req, res);
        return true;
    }
    // GET BY ID
    if (req.method === 'GET' && urlParts.length === 4) {
        (0, climateController_1.getRecordById)(req, res, Number(urlParts[3]));
        return true;
    }
    // POST
    if (req.method === 'POST' && req.url === '/api/climate') {
        (0, climateController_1.createRecord)(req, res);
        return true;
    }
    // PUT
    if (req.method === 'PUT' && urlParts.length === 4) {
        (0, climateController_1.updateRecord)(req, res, Number(urlParts[3]));
        return true;
    }
    // DELETE
    if (req.method === 'DELETE' && urlParts.length === 4) {
        (0, climateController_1.deleteRecord)(req, res, Number(urlParts[3]));
        return true;
    }
    return false;
};
exports.default = climateRoutes;
