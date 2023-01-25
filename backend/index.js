import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./Models/UserModel.js";
import AuthRoute from "./Routes/AuthRoute.js";
import UserRoute from "./Routes/UserRoute.js";
import PostRoute from "./Routes/PostRoute.js";

const app = express();
app.use(express.json());

dotenv.config();

let PORT = process.env.PORT || 5000;
let URI = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening at ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Api Working");
});

app.use("/api", AuthRoute, UserRoute, PostRoute);

export default app;
