require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to Uncaught Exception`);
   process.exit(1);
});

// Connect to Database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
   console.log(`SERVER IS RUNNING AT http://localhost:${process.env.PORT}`);
});

// UnHandle Promise Rejection
process.on("unhandledRejection", (err) => {
   console.log(`Error: ${err.message}`);
   console.log(`Shutting down the server due to Unhandled Promise Rejection`);
   server.close(() => {
      process.exit(1);
   });
});
