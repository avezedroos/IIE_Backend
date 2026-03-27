const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const saleRoutes = require("./routes/saleRoutes");
const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(require("cors")());

// Routes
app.use("/api/sales", saleRoutes);

// Error Middleware
app.use(errorHandler);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

