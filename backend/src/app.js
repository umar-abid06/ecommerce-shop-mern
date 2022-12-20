import express from "express";
import cors from "cors";
import morgan from "morgan";
import api from "./routes/api.js";
import path from "path";
import { fileURLToPath } from "url";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.use(cors());

app.use(morgan("combined"));

//Chain of middlewares (that handles the requests as they come into our application)
app.use(express.json());
//Checks the request JSON content-type and parses it, if we are passing some data!
app.use(express.static(path.join(__dirname, "..", "public")));
//This is to serve the public folder(The client of our app) from the server

app.use("/api/v1", api);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

// custom error handlers middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
