import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import barangRoute from "./routes/barangRoute.js";

dotenv.config();
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use(barangRoute);

//Port to listen
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
