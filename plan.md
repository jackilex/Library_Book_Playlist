1) test api 
1) set up back-end server, shemas and routes
2) set up react front-end
3) components :1) navabar, search bar, card,books saved
                2) library section




const librarySchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    books:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Books'
    }
]
    

});

const Book= mongoose.model('Books',bookSchema)

const Library= mongoose.model('Library',librarySchema)




async function createBook(title,authors, description,bookId,image,link){

    const newBook= new Book({
title,
authors, 
description,
bookId,
image,
link
});

const result = await newBook.save()

console.log(result)
}



async function createLibrary(name,books){

const newLibrary= new Library({
name,books
});

const result = await newLibrary.save()

console.log(result)
}




async function popuateLibrary() {
    const libraries= await Library
    .find({})
    .populate('books')
    .select("books")

    console.log(libraries)
}


async function addToLibrary(id) {
const updated= await Library.findByIdAndUpdate(
    id,{$push:{"books":"5f5d3dc8cbe50b0bac2c310f"}},{new: true})

}
// createLibrary("Bookshelf1","5f5d3db5b326cd27b4503d20")


// createBook("Magic","Paul", "It is about","22255eer","image","link")
popuateLibrary()

// addToLibrary("5f5d3e0392c1c5337cc2f7e1")


//////////////////////////////////////////////////////////////
//testing schema on this file
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/googlebooks")
.then(()=> console.log('connected to Mongodb'))
.catch(err=> console.log('could not connect to MongoDb...', err))
