const mongoose= require('mongoose');

//testing schema on this file
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks")
.then(()=> console.log('connected to Mongodb'))
.catch(err=> console.log('could not connect to MongoDb...', err))

const bookSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    bookId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    publish:{
        type:String,
        required:true
    },
    dateSaved:{
        type:Date,
        default:Date.now
    }

});




const Book= mongoose.model('Book',bookSchema)



exports.Book=Book

//1) create a new schema object from the mongoose class
//2) combine the new object schema into a model/class to use