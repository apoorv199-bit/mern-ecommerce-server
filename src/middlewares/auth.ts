import { User } from "../models/user.js";
import ErrorHandler from "../utils/utility-class.js";
import { TryCatch } from "./error.js";

export const adminOnly = TryCatch(async (req, res, next) => {
  const { id } = req.query;

  if (!id) {
    return next(new ErrorHandler("You are not logged in", 401));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(new ErrorHandler("Invalid Id", 401));
  }
  if (user.role !== "admin") {
    return next(new ErrorHandler("You are not authorized", 403));
  }

  next();
});
