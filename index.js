// `step 1`
const express=require('express')
const mongoose=require("mongoose");
// const routes =require('./routes');
const app= express()
const book= require('./routes/book')
const library= require('./routes/library')
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// `step 1`
// ` Define middleware here for incoming data`
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}


// `setting up mongoDB connection to use localhost
// or production env`
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks", {
    useNewUrlParser: true,
    useFindAndModify: false,
     useUnifiedTopology: true 

  });

mongoose.connection.on('connected',()=>{
  console.log('Mongoose connected')
})




//step 4 after setting up routes (middleware)
app.use('/api/book', book);
app.use('/api/library', library);
 

// `step 2 set up to use express router set up
// app.use(routes);


// `step 1 sarting server api`
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}!`);
  });