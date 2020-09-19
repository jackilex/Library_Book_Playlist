const {Book}= require("../models/books");
const {Library}= require("../models/library");
const mongoose=require('mongoose');
const express= require('express');
const Fawn = require("fawn");
const router = express.Router();


// Fawn.init(mongoose);

router.get('/', async (req,res)=>{
    const savedBooks= await Book.find().select().sort('-dateSaved')

    if(!savedBooks.length) return res.status(400).send('no books saved')

    res.send(savedBooks)
})


router.post('/', async (req,res)=>{
    const checkBooks= await Book.find({"bookId":req.body.bookId});
    // console.log(typeof checkBooks)
    if(Object.keys(checkBooks).length > 0) return res.status(422).send(new error)

    const newBook= new Book({
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        bookId:req.body.bookId,
        image:req.body.image,
        link:req.body.link,
        publish:req.body.publish
})

    await newBook.save()
    // console.log(checkBook)
    res.send(newBook)


})

router.get('/:id', async(req,res)=>{
    // const findBook= await Book.findById(req.params.bookId).select();
    const findBooks=await Book.find({_id:{$in:req.params.id}})
    console.log(findBooks)
    res.send(findBooks)
   })


router.delete('/:id', async(req,res)=>{
//  const thisBook= await Book.findByIdAndRemove(req.params.id);

//   if(!thisBook) return res.status(404).send('The book was not found.');
//  console.log(error)

 const findLibrary= await Library.find({books:req.params.id}).select('_id')
 const findBooksArray= await Library.findById(findLibrary[0]._id).select('books -_id')
 
 if(findLibrary.length>0){
     let bk=req.params.id
     let newArray=[]
    let bookNotToRemove= findBooksArray.books.map(x=> {
        
        if(x == bk){
            return
        }else{
            newArray.push(x)
        }
        return newArray
    })

     let id=findLibrary
    let remove= await Library.update({_id:findLibrary[0]._id},{$set:{books:newArray}});
    await remove.save()
    res.send(remove);
    console.log(remove)
}
//  res.send(findBooksArray)
// console.log(findBooksArray)
// res.send(thisBook)

})


module.exports = router;


// if(checkBook.length==0) return res.satus(400).send('this book with given ID is invalid, cannot be deleted');
// try{
//     new Fawn.Task()
//     .remove('books',{"_id":req.body._id})
//     .update('libraries',{$unset:{"bookId":req.body.BookId}})
//     .run()

//     res.send('deleted')
// }catch (ex){
// res.status(400).send('Failed')
// }
//  console.log(checkBook)