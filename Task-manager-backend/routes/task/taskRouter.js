import express from "express";
import { authenticateUser } from "../../middleware/auth.js";
import {
  createTask,
  deleteTaskById,
  getAllTasks,
  searchTasks,
  updateTaskById,
} from "../../controllers/taskManage/taskManageContoller.js";

const router = express.Router();

router.post("/create", authenticateUser, createTask);
router.get("/get-all", authenticateUser, getAllTasks);
router.put("/update/:taskId", authenticateUser, updateTaskById);
router.delete("/delete/:taskId", authenticateUser, deleteTaskById);


export default router;
