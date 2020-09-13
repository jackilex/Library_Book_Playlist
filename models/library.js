const mongoose= require('mongoose');
const Book= require('./books')

//testing schema on this file
// mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks")
// .then(()=> console.log('connected to Mongodb'))
// .catch(err=> console.log('could not connect to MongoDb...', err))

const librarySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    dateCreated:{
        type:Date,
        required:true,
        default:Date.now
    },
    books:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Book'
    }
]
    

});

const Library= mongoose.model('Library',librarySchema)


exports.Library=Library