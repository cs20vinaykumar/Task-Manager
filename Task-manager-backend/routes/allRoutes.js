import express from "express";
const mainRouter = express.Router();

import { userSignupRoute, userLoginRoute, taskRoute } from "../constant/route.js";

import userSignupRouter from "./userAuth/userAuthRouter.js";
import userLoginRouter from "./userAuth/userAuthRouter.js"
import taskRouter from "./task/taskRouter.js";

mainRouter.use(userSignupRoute, userSignupRouter);
mainRouter.use(userLoginRoute, userLoginRouter);
mainRouter.use(taskRoute, taskRouter);

export default mainRouter;
