import mongoose from "mongoose";
import { getCurrentRunningEnviorment } from "../../utils/basic.js";
import { ENVIROMENTS } from "../../constant/basic.js";

const connectToMongoDb = async () => {
  try {
    const currentEnviroment = getCurrentRunningEnviorment();

    const url =
      currentEnviroment === ENVIROMENTS.LOCAL
        ? process.env.MONGO_DB_URI_LOC
        : process.env.MONGO_DB_URI_DEV;

    await mongoose.connect(url);

    console.log(
      `Connected to mongoDb Sucessfully - ${getCurrentRunningEnviorment()}`
    );
  } catch (error) {
    console.log("Connection Error", error);
  }
};

export default connectToMongoDb;
