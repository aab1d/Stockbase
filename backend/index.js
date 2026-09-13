import e from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoute from "./routes/authRoute.js";
import productRoute from "./routes/productRoute.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";
const PORT = process.env.PORT;
const app = e();
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(e.json());
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }),
);

app.use("/auth", authRoute);
app.use("/product", productRoute);

app.use(notFound);
app.use(errorHandler);
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
  });
});
