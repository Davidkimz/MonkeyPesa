//Require modules
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const cookie = require("cookie-session");
const cors = require("cors");
require("dotenv").config();

//set up express
const app = express();
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(cors()); 
app.use('/shared', express.static('shared'));


//To Pass form inputs as application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}))

//Use Flash and Cookie session
app.use(cookie({
  name: 'session',
  keys: ['X_732jjUjsakskkd(', ')dtOuQsd$>@A[w'],
  maxAge: 1000 * 60
}))

app.use(flash());

//Set EJS as Template Engine
app.set('view engine', 'ejs');

//Local Db connection
// mongoose.connect(
//   process.env.MONGODB_CONNECTION_STRING,  
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true
//   },
//   (err) => {
//     if(err) throw err;
//     console.log("MongoDB connection established");
//   }
// );

//Online Db Connection
const connectionString =
"mongodb+srv://Emma:ehelisemmy@cluster0.2fkfy.mongodb.net/Emma?retryWrites=true&w=majority"
// Connect to the database
mongoose.connect(
  connectionString,
  // This is for backward compartibility
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
  error => {
    if (error) {
      console.log(error);
    } else {
      console.log('Connected to MongoDb');
    }
  }
);





//ROUTES
app.use('/', require("./Routes/homeRoute"));
app.use('/password', require("./Routes/ChangePasswordRequestRoute"))
app.use('/users', require("./Routes/userRoutes"))
app.use('/sales', require("./Routes/saleRoutes"))
app.use('/contacts', require("./Routes/contactRoutes"))
app.use('/email', require("./Routes/emailRoutes"))
app.use('/sms', require("./Routes/smsRoutes"))


//PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`The Server has started on port: ${PORT}`));
