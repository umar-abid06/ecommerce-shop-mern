import http from "http";
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import colors from "colors";

dotenv.config();
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer = async () => {
  server.listen(PORT, () => {
    connectDB();
    console.log(
      `Running in ${process.env.NODE_ENV} mode on http://localhost:${PORT}`
        .yellow.bold.underline
    );
  });
};
startServer();
