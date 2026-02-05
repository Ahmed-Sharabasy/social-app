import { matchedData, validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  // if (!errors.isEmpty()) {return res.status(400).json({ errors: errors.array()})}

  // send only the first error message
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0];
    return next(new AppError(firstError.msg, 400));
  }

  // if no errors, get the validated data
  req.validatedData = matchedData(req);

  next();
};
