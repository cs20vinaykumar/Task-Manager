import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { STATUS_CODE, STATUS_MESSAGES } from "../constant/status.js";
import { ERROR_MESSAGES, UNAUTHORIZE_MESSAGES } from "../constant/error.js";
import ServerErrorResponse from "../utils/classes/ServerErrorResponse.js";

export const authenticateUser = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json(
        ServerErrorResponse.customError(
          false,
          STATUS_CODE.UNAUTHORIZED,
          STATUS_MESSAGES.ERROR,
          UNAUTHORIZE_MESSAGES.NOT_LOGGED_IN,
          null
        )
      );
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const { userId } = payload;

    const userData = await User.findById(userId);

    if (!userData) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            false,
            STATUS_CODE.UNAUTHORIZED,
            STATUS_MESSAGES.ERROR,
            UNAUTHORIZE_MESSAGES.USER_NOT_FOUND,
            null
          )
        );
    }

    req.user = userData;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customeError(
            false,
            STATUS_CODE.UNAUTHORIZED,
            STATUS_MESSAGES.ERROR,
            ERROR_MESSAGES.EXPIRED_JWT,
            null
          )
        );
    }

    console.error("JWT verification error:", error);
    return res
      .status(STATUS_CODE.UNAUTHORIZED)
      .json(
        ServerErrorResponse.customError(
          false,
          STATUS_CODE.UNAUTHORIZED,
          STATUS_MESSAGES.ERROR,
          ERROR_MESSAGES.INVALID_JWT,
          error
        )
      );
  }
};
