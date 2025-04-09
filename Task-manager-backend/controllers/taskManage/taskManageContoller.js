import { STATUS_CODE, STATUS_MESSAGES } from "../../constant/status.js";
import { ERROR_MESSAGES, UNAUTHORIZE_MESSAGES } from "../../constant/error.js";
import SUCCESS_MESSAGES from "../../constant/success.js";
import ServerErrorResponse from "../../utils/classes/ServerErrorResponse.js";
import ServerSuccessResponse from "../../utils/classes/ServerSuccessResponse.js";
import { validateRequiredFields } from "../../utils/basic.js";
import Task from "../../model/task.js";

export const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const currentUser = req.user;

  const requiredFields = ["title", "description", "status", "dueDate"];
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

  try {
    const newTask = new Task({
      title,
      description,
      status,
      dueDate,
      user: currentUser._id,
    });

    const savedTask = await newTask.save();
    return res
      .status(STATUS_CODE.CREATED)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_CODE.CREATED,
          STATUS_MESSAGES.SUCCESS,
          SUCCESS_MESSAGES.CREATED,
          savedTask
        )
      );
  } catch (error) {
    console.error(error.message);
    res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

export const getAllTasks = async (req, res) => {
  const currentUser = req.user;

  try {
    const getAllTasks = await Task.find({ user: currentUser._id });

    if (!getAllTasks || getAllTasks.length === 0) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.TASK_NOT_FOUND));
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_CODE.OK,
          STATUS_MESSAGES.SUCCESS,
          SUCCESS_MESSAGES.RETREVIED,
          getAllTasks
        )
      );
  } catch (error) {
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

export const updateTaskById = async (req, res) => {
  const { taskId } = req.params;

  const { title, description, status, dueDate } = req.body;
  const requiredFields = ["title", "description", "status", "dueDate"];
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

  try {
    const task = await Task.findById(taskId);
    if (!task) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.TASK_NOT_FOUND));
    }

    const checkTaskField = await Task.findOne({
      title,
      description,
      status,
      dueDate,
      _id: { $ne: taskId },
    });
    if (checkTaskField) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .json(
          ServerErrorResponse.badRequest(ERROR_MESSAGES.TASK_ALREADY_EXISTS)
        );
    }

    const filter = {
      _id: task._id,
    };

    const updatedData = {
      title,
      description,
      status,
      dueDate,
    };

    const updatedTask = await Task.findByIdAndUpdate(filter, updatedData, {
      new: true,
    });

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_CODE.OK,
          STATUS_MESSAGES.SUCCESS,
          SUCCESS_MESSAGES.UPDATED,
          updatedTask
        )
      );
  } catch (error) {
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

export const deleteTaskById = async (req, res) => {
  const { taskId } = req.params;

  try {
    const findTaskAndDelete = await Task.findByIdAndDelete(taskId);
    if (!findTaskAndDelete) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .json(ServerErrorResponse.notFound(ERROR_MESSAGES.TASK_NOT_FOUND));
    }

    return res
      .status(STATUS_CODE.OK)
      .json(
        ServerSuccessResponse.successResponse(
          true,
          STATUS_CODE.OK,
          STATUS_MESSAGES.SUCCESS,
          SUCCESS_MESSAGES.DELETED,
          findTaskAndDelete
        )
      );
  } catch (error) {
    return res
      .status(STATUS_CODE.SERVER_ERROR)
      .json(ServerErrorResponse.internal(error));
  }
};

