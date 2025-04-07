import { ENVIROMENTS } from "../constant/basic.js";
import serverSuccessResponse from "./classes/ServerSuccessResponse.js";
import { STATUS_CODE, STATUS_MESSAGES } from "../constant/status.js";
import { ERROR_MESSAGES } from "../constant/error.js";

import SUCCESS_MESSAGES from "../constant/success.js";

export const getCurrentRunningEnviorment = () => {
  console.log("process.env.NODE_ENV: ", process.env.NODE_ENV);
  return process.env.NODE_ENV === ENVIROMENTS.LOCAL
    ? ENVIROMENTS.LOCAL
    : ENVIROMENTS.DEVLOPMENT;
};

export const validateRequiredFields = (body, requiredFields) => {
  return new Promise((resolve, reject) => {
    const missingFields = requiredFields.filter((field) => !body[field]);

    if (missingFields.length > 0) {
      resolve(
        serverSuccessResponse.successResponse(
          false,
          STATUS_CODE.BAD_REQUEST,
          STATUS_MESSAGES.ERROR,
          ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS,
          { missingFields }
        )
      );
    } else {
      resolve(
        serverSuccessResponse.successResponse(
          true,
          STATUS_CODE.OK,
          STATUS_MESSAGES.SUCCESS,
          SUCCESS_MESSAGES.OPERATION_SUCCESSFULL,
          null
        )
      );
    }
  });
};
