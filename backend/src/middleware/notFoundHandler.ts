import { Request, Response, NextFunction } from "express";
import { NOT_FOUND } from "../constant/http";

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  res.status(NOT_FOUND).json({
    message: `Route ${req.originalUrl} not found`,
  });
};

export default notFoundHandler;
