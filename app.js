const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config({ path: "config.env" });
const globalErrorHandler = require("./controller/errorController");
const AppError = require("./utils/AppError");
require("./config/connectionDB");


const app = express();
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`node: ${process.env.NODE_ENV}`);
} else {
  console.log(`node: ${process.env.NODE_ENV}`);
}

const departmentRoute = require("./routes/department");
const employeeRoute = require("./routes/employee");

app.use("/api/v1/department", departmentRoute);
app.use("/api/v1/employee", employeeRoute);

app.all("*", (req, res, next) => {
  //   res.status(404).json({
  //     status: "fail",
  //     message: `can't find ${req.originalUrl} on this server!`,
  //   });
  // const err = new Error(`can't find ${req.originalUrl} on this server!`)
  // err.status = 'fail'
  // err.statusCoude = 404;
  return next(
    new AppError(`can't find ${req.originalUrl} on this server!`, 404)
  );
});
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});


process.on('unhandledRejection',(err)=>{
  console.log(`unhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(()=>{
    console.log(`Shutting down ...`); 
    process.exit(1)
  })
})


process.on('uncaughtException',(err)=>{
  console.log(`uncaughtException Errors: ${err.name} | ${err.message}`);
  server.close(()=>{
    console.log(`Shutting down ...`); 
    process.exit(1)
  })
})