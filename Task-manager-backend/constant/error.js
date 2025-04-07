export const ERROR_MESSAGES = {
  INVALID_EMAIL:
    "The email address provided is not valid. Please enter a valid email address.",
  INVALID_PASSWORD:
    "Password must contain at least 8 characters, including uppercase and lowercase letters, one digit, and one special character (@$!%*?&).",
  INVALID_PHONE_NO:
    "Invalid phone number format. Please enter a valid phone number.",
  EMAIL_REQUIRED: "Email address is required",
  PASSWORD_REQUIRED: "Password is required",
  PASSWORDS_DO_NOT_MATCH: "Passwords do not match.",
  USER_ALREADY_EXISTS: "User already exists.",
  INVALID_JWT: `Invalid token! Please Login Again`,
  EXPIRED_JWT: `Your token has expired! please login again`,
  UNAUTHORIZE: "You are not authorize to perform this action",
  INVALID_LOGIN_CREDENTIALS: "Email or Password is Incorrect",
  NOT_FOUND: "Not Found",

  TASK_NOT_FOUND: "Task not found",
  TASK_ALREADY_EXISTS: "Task already exists",
};

export const UNAUTHORIZE_MESSAGES = {
  USER_NOT_FOUND: "No user found with this email address",
  USER_ALREADY_EXISIT: "User already exisit with this email address",
  NOT_LOGGED_IN: `You are not logged in please login to get Access`,
  INCORRECT_PASSWORD: "Incorrect password.",
};
