import ClimateRecord from '../models/ClimateRecord';
import repository from '../repositories/climateRepository';

const getAllRecords = (): ClimateRecord[] => {
  return repository.getAll();
};

const getRecordById = (
  id: number
): ClimateRecord | undefined => {
  return repository.getById(id);
};

const createRecord = (
  data: Omit<ClimateRecord, 'id'>
): ClimateRecord => {
  const record = new ClimateRecord(
    Date.now(),
    data.city,
    data.temperature,
    data.humidity,
    data.pressure,
    data.date
  );

  return repository.create(record);
};

const updateRecord = (
  id: number,
  data: Partial<ClimateRecord>
): ClimateRecord | null => {
  return repository.update(id, data);
};

const deleteRecord = (
  id: number
): boolean => {
  return repository.remove(id);
};

export default {
  getAllRecords,
  getRecordById,
  createRecord,
  updateRecord,
  deleteRecord,
};
