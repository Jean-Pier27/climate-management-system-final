import { Request, Response } from 'express';
import ClimateRecord from '../models/ClimateRecord';
import climateService from '../services/climateService';

export const getAllRecords = (req: Request, res: Response): void => {
  const records = climateService.getAllRecords();
  res.status(200).json(records);
};

export const getRecordById = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const record = climateService.getRecordById(id);

  if (!record) {
    res.status(404).json({
      message: 'Registro no encontrado',
    });
    return;
  }

  res.status(200).json(record);
};

export const createRecord = (req: Request, res: Response): void => {
  const data: Omit<ClimateRecord, 'id'> = req.body;

  if (
    !data.city ||
    data.temperature === undefined ||
    data.humidity === undefined ||
    data.pressure === undefined
  ) {
    res.status(400).json({
      message: 'Datos inválidos',
    });
    return;
  }

  const record = climateService.createRecord(data);

  res.status(201).json(record);
};

export const updateRecord = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const data: Partial<ClimateRecord> = req.body;

  if (
    !data.city ||
    data.temperature === undefined ||
    data.humidity === undefined ||
    data.pressure === undefined
  ) {
    res.status(400).json({
      message: 'Datos inválidos',
    });
    return;
  }

  const updated = climateService.updateRecord(id, data);

  if (!updated) {
    res.status(404).json({
      message: 'Registro no encontrado',
    });
    return;
  }

  res.status(200).json(updated);
};

export const deleteRecord = (req: Request, res: Response): void => {
  const id = Number(req.params.id);
  const deleted = climateService.deleteRecord(id);

  if (!deleted) {
    res.status(404).json({
      message: 'Registro no encontrado',
    });
    return;
  }

  res.status(200).json({
    message: 'Registro eliminado correctamente',
  });
};
