const {Book}= require("../models/books");
const mongoose=require('mongoose');
const express= require('express');
const Fawn = require("fawn");
const router = express.Router();


Fawn.init(mongoose);

router.get('/', async (req,res)=>{
    const savedBooks= await Book.find().select().sort('-dateSaved')

    if(!savedBooks) return res.status(400).send('no books saved')

    res.send(savedBooks)
})


router.post('/', async (req,res)=>{
    const checkBooks= await Book.find({"bookId":req.body.bookId})
    if(checkBooks.length > 0) return res.status(400).send('book is already saved')
    
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
    const findBook= await Book.findById(req.params.bookId).select();
   
    console.log(req.prams.id)
    res.send(findBook)
   })


router.delete('/:id', async(req,res)=>{
 const thisBook= await Book.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id));

  if(!thisBook) return res.status(404).send('The book was not found.');
 console.log(error)

res.send(thisBook)
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