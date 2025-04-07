import {
  STATUS_CODE,
  STATUS_MESSAGES,
  ACCOUNT_STATUS,
} from "../../constant/status.js";
import { ERROR_MESSAGES, UNAUTHORIZE_MESSAGES } from "../../constant/error.js";
import SUCCESS_MESSAGES from "../../constant/success.js";
import ServerErrorResponse from "../../utils/classes/ServerErrorResponse.js";
import ServerSuccessResponse from "../../utils/classes/ServerSuccessResponse.js";
import {
  emailRegex,
  passwordRegex,
  pkPhoneNoRegex,
} from "../../utils/regex.js";
import User from "../../model/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwtToken.js";
import { validateRequiredFields } from "../../utils/basic.js";

export const loginUser = async (req, res) => {
  const { emailAddress, password } = req.body;
  if (!emailAddress || !password) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(ERROR_MESSAGES.EMPTY_REQUIRED_FIELDS);
  }

  if (!emailRegex.test(emailAddress)) {
    return res
      .status(STATUS_CODE.BAD_REQUEST)
      .json(ServerErrorResponse.badRequest(ERROR_MESSAGES.INVALID_EMAIL));
  }

  try {
    const user = await User.findOne({ emailAddress });
    if (!user) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(
          ServerErrorResponse.notFound(UNAUTHORIZE_MESSAGES.USER_NOT_FOUND)
        );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            false,
            STATUS_CODE.UNAUTHORIZED,
            STATUS_MESSAGES.FAILED,
            UNAUTHORIZE_MESSAGES.INCORRECT_PASSWORD,
            null
          )
        );
    }

    if (user.accountStatus === ACCOUNT_STATUS.INACTIVE) {
      return res
        .status(STATUS_CODE.UNAUTHORIZED)
        .json(
          ServerErrorResponse.customError(
            false,
            STATUS_CODE.UNAUTHORIZED,
            STATUS_MESSAGES.FAILED,
            UNAUTHORIZE_MESSAGES.INACTIVE_ACCOUNT,
            null
          )
        );
    }

    let tokenPayload = {
      userId: user._id,
      fullName: user.fullName,
      emailAddress: user.emailAddress,
      phoneNo: user.phoneNo,
      isActive: user.isActive,
    };

    const token = generateToken(tokenPayload);

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_CODE.OK,
          STATUS_MESSAGES.SUCCESS,
          SUCCESS_MESSAGES.LOGGED_IN,
          { authToken: token }
        )
      );
  } catch (error) {
    console.log(error);
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

export const signupUser = async (req, res) => {
  try {
    const { fullName, emailAddress, password, phoneNo, confirmPassword } =
      req.body;

    const requiredFields = [
      "fullName",
      "emailAddress",
      "password",
      "phoneNo",
      "confirmPassword",
    ];

    const validationResponse = await validateRequiredFields(
      req.body,
      requiredFields
    );

    if (
      !validationResponse.success &&
      validationResponse.statusCode === STATUS_CODE.BAD_REQUEST
    ) {
      return res.status(validationResponse.statusCode).json(validationResponse);
    }

    if (!emailRegex.test(emailAddress)) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(ServerErrorResponse.badRequest(ERROR_MESSAGES.INVALID_EMAIL));
    }

    if (!passwordRegex.test(password)) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(ServerErrorResponse.badRequest(ERROR_MESSAGES.INVALID_PASSWORD));
    }
    if (!pkPhoneNoRegex.test(phoneNo)) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(ServerErrorResponse.badRequest(ERROR_MESSAGES.INVALID_PHONE_NO));
    }

    if (password !== confirmPassword) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH)
        );
    }

    const existingUser = await User.findOne({ emailAddress });
    if (existingUser) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(
            UNAUTHORIZE_MESSAGES.USER_ALREADY_EXISIT
          )
        );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      fullName,
      emailAddress,
      password: hashedPassword,
      phoneNo,
    });

    const savedUser = await newUser.save();

    return res
      .status(STATUS_CODE.CREATED)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_CODE.CREATED,
          STATUS_MESSAGES.SUCCESS,
          SUCCESS_MESSAGES.CREATED
        )
      );
  } catch (error) {
    console.log("Signup Error:", error);
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};
