import { climateRecords } from '../data/database';
import ClimateRecord from '../models/ClimateRecord';

const getAll = (): ClimateRecord[] => climateRecords;

const getById = (id: number): ClimateRecord | undefined =>
  climateRecords.find((record) => record.id === id);

const create = (record: ClimateRecord): ClimateRecord => {
  climateRecords.push(record);
  return record;
};

const update = (
  id: number,
  updatedData: Partial<ClimateRecord>
): ClimateRecord | null => {
  const index = climateRecords.findIndex((record) => record.id === id);

  if (index === -1) return null;

  climateRecords[index] = {
    ...climateRecords[index],
    ...updatedData,
  };

  return climateRecords[index];
};

const remove = (id: number): boolean => {
  const index = climateRecords.findIndex((record) => record.id === id);

  if (index === -1) return false;

  climateRecords.splice(index, 1);

  return true;
};

export default {
  getAll,
  getById,
  create,
  update,
  remove,
};
