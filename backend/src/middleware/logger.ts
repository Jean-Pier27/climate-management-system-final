import { Request } from 'express';

const logger = (req: Request): void => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.url}`
  );
};

export default logger;