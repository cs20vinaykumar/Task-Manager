import { STATUS_CODE, STATUS_MESSAGES } from "../../constant/status.js";

class ServerErrorResponse {
  constructor(success, statusCode, statusMessage, message, error, stack) {
    this.success = success;
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
    this.message = message;
    if (error) {
      this.error = error;
    }
    if (stack) {
      this.stack = stack;
    }
  }

  static badRequest(message) {
    return new ServerErrorResponse(
      false,
      STATUS_CODE.BAD_REQUEST,
      STATUS_MESSAGES.FAILED,
      message
    );
  }

  static internal(error) {
    return new ServerErrorResponse(
      false,
      STATUS_CODE.SERVER_ERROR,
      STATUS_MESSAGES.SERVER_ERROR,
      error,
      error.stack
    );
  }

  static notFound(message) {
    return new ServerErrorResponse(
      false,
      STATUS_CODE.NOT_FOUND,
      STATUS_MESSAGES.FAILED,
      message
    );
  }

  static customError(success, statusCode, statusMessage, message, error) {
    return new ServerErrorResponse(
      success,
      statusCode,
      statusMessage,
      message,
      error
    );
  }
}

export default ServerErrorResponse;
