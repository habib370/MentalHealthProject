require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

const app = express();

connectDB();

/* ✅ CORS FIX (IMPORTANT) */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* OPTIONAL: handle preflight requests */
app.options(/.*/, cors());

/* Middlewares */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());



/* Routes */
app.use("/", require("./routes/authRoutes"));

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});