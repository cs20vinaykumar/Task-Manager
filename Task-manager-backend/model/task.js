import mongoose from "mongoose";
import { TASK_STATUS } from "../constant/basic.js";
const taskStatusEnum = [
  TASK_STATUS.TODO,
  TASK_STATUS.IN_PROGRESS,
  TASK_STATUS.COMPLETED,
];

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: taskStatusEnum,
      default: TASK_STATUS.TODO,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
const Task = mongoose.model("TaskList", taskSchema);
export default Task;
