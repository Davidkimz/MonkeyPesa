const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const userRoutes = require("./Routes/userRoutes");
const contactRoutes = require("./Routes/contactRoutes");
const changePasswordRequestRoute = require("./Routes/ChangePasswordRequestRoute");
const emailRoutes = require("./Routes/emailRoutes")


//set up express
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors()); 

//set mongoose
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,  
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  },
  (err) => {
    if(err) throw err;
    console.log("MongoDB connection established");
  }
);

//ROUTES
app.use('/users', userRoutes)
app.use("/contacts", contactRoutes)
app.use("/password", changePasswordRequestRoute)
app.use("/email", emailRoutes)


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`The Server has started on port: ${PORT}`));














