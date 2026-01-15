import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import session from "express-session";
import handlerFunction from "./controller.js";

const app = express();
const port = process.env.PORT || 1088;


app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "change-this-secret-in-production",
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// API Routes
app.post("/addUser", handlerFunction.addUser);
app.get("/getUserInfo", handlerFunction.getUserInfo);

// Error handling middleware (should be last)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(err.status || 500).json({
    message: err.message || "Internal server error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler - Removed to allow ViteExpress to handle frontend routing
// app.use((req, res) => {
//   res.status(404).json({ message: "Route not found" });
// });

ViteExpress.listen(app, port, () =>
  console.log(`Server is listening on http://localhost:${port}`)
); 