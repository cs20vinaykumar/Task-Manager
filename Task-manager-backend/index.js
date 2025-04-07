import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import connectToMongoDb from "./configs/databaseConnetion/db.js";
import allRoutes from "./routes/allRoutes.js";
dotenv.config({
  path: "./configs/.env",
});

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());

app.use("/api", allRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (error) => {
  if (error) {
    console.log("Error in running server", error);
  } else {
    connectToMongoDb();
    console.log(`server is running at http://localhost:${PORT}`);
  }
});
