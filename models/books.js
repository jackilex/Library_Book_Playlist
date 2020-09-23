const mongoose= require('mongoose');

// //testing schema on this file
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks")
// .then(()=> console.log('connected to Mongodb'))
// .catch(err=> console.log('could not connect to MongoDb...', err))

const bookSchema= new mongoose.Schema({
    title:{
        type:String
    },
    author:{
        type:String
    },
    description:{
        type:String
        
    },
    bookId:{
        type:String
    },
    image:{
        type:String
    },
    link:{
        type:String
    },
    publish:{
        type:String
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