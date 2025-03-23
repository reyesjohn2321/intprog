import "reflect-metadata";
import express from "express";
import { createConnection } from "typeorm";
import userRoutes from "./routes/user";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/users", userRoutes);

createConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}).catch((error) => console.log(error));