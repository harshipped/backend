import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

app.use(cookieParser());

// Add this BEFORE your userRouter line in app.js
app.post("/api/v1/users/test", (req, res) => {
  console.log("Body:", req.body);
  console.log("Files:", req.files);
  res.json({ success: true });
});

//importing routes
import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
});

export { app };
