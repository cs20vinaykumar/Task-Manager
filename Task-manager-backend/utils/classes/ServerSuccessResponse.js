import { STATUS_CODE, STATUS_MESSAGES } from "../../constant/status.js";

class serverSuccessResponse {
  constructor(success, statusCode, statusMessage, message, data) {
    (this.success = success),
      (this.statusCode = statusCode),
      (this.statusMessage = statusMessage),
      (this.message = message),
      (this.data = data);
  }
  static successResponse(success, code, statusMessage, message, data) {
    return new serverSuccessResponse(
      success,
      code,
      statusMessage,
      message,
      data
    );
  }
  static creationResponse(message, data) {
    return new serverSuccessResponse(
      true,
      STATUS_CODE.CREATED,
      STATUS_MESSAGES.SUCCESS,
      message,
      data
    );
  }
}

export default serverSuccessResponse;
