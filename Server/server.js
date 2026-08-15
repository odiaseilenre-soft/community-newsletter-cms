import "dotenv/config";

import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import env from "./config/env.js";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import userRoutes from './routes/userRoutes.js';
import postRoutes from "./routes/postRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";

import errorHandler from "./middleware/errorHandler.js";

const port = env.PORT;

const app = express();


// Middleware
//app.use(helmet());
 app.use(
   helmet({
     crossOriginResourcePolicy: false,
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "http://localhost:5000",],
      },
    }, 
 })
 );
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});



// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Community Newsletter CMS API v1 is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Global Error Handler
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server");
    process.exit(1);
  }
};

startServer();