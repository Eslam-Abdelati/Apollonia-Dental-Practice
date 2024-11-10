const mongoose = require("mongoose");
// const DB = process.env.DATABASE.replace(
//   "<PASSWORD>",
//   process.env.DATABASE_PASSWORD
// );
// mongoose
//   .connect(DB)
//   .then((conn) => {
//     console.log(`Database Connected: ${conn.connection.host}`);
//   })
//   .catch((err) => {
//     console.error(`Database Error: ${err}`);
//   });


  mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then((conn) => {
    console.log(`Database Connected: ${conn.connection.host}`);
  })
  .catch((err) => {
    console.error(`Database Error: ${err}`);
  });