import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import exercise from "./routes/exercise.mjs";
import reset from "./routes/reset.mjs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.join(__filename, "fitapp");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
console.log("path: ", path.join(__dirname, "../../..", "client/build"));
app.use(express.static(path.join(__dirname, "../../..", "client/build")));
//app.use(express.static("../client/public"));

app.use("/exercise", exercise);
app.use("/reset", reset)



// Global error handling
app.use((err, _req, res, next) => {
    res.sendFile(path.join(__dirname, "../..", "client/build", "index.html"));
})

// start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});