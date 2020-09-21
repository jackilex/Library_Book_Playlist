const {Library}= require("../models/library");
const {Book}= require("../models/books");
const mongoose=require('mongoose');
const express= require('express');
const router = express.Router();



router.get('/', async (req,res)=>{
    const libraries= await Library.find().sort('dateCreated')

    if(libraries.length===0) return res.status(400).send('no libraries created')

    res.send(libraries)
})

router.get("/:id", async (req,res)=>{

    try{
        const library=Library.findById(req.params.id)
    if(library.length===0)return res.status(400).send('no libraries found')


    const thisLibrary= await Library.findById(req.params.id).populate('Book').select()
    res.send(thisLibrary)
}catch(ex){
    res.status(400).send(ex)
}

})



router.post('/', async (req,res)=>{
    const checkLibrary= await Library.find({name:req.body.name})
    if(checkLibrary.length > 0) return res.status(400).send('This name is already in use by another library')


    const newLibrary= new Library({
        name:req.body.name,
        books:req.body.books
        
    })

    await newLibrary.save()

    res.send(newLibrary)

})


router.put("/:id", async (req,res)=>{
try{
    const library=await Library.findById(req.params.id)
    
    if(Object.keys(library).length === 0)return res.status(400).send('no libraries found')

    const checkBooks= await Library.find().select('books -_id');
    console.log(checkBooks)
    if(checkBooks.length>0){
    let bk=req.params.id
     let newBook;
    checkBooks.map(x=> {
        if(x.books.length>0){
            x.books.map(y=>{
               if ( y== req.body.book) newBook=true
            })
        }else{
            return
        }
        // return newArray
       console.log(newBook)
    })
    console.log(newBook)
    if(newBook == undefined){
    const newBook= await Library.findByIdAndUpdate(req.params.id,{$push:{"books":req.body.book}},{new: true})
    res.send("book added to library")
    }else{
        res.status(404).send('Only one book allowed per library')
    }
    }else{
    const newBook= await Library.findByIdAndUpdate(req.params.id,{$push:{"books":req.body.book}},{new: true})
    res.send("book added to library")
    }


}
catch(ex){
    console.log(ex)
}
    
})


router.delete('/:id'), async(req,res)=>{
    const removedLibrary= await Library.findByIdAndRemove(req.body._id);
   
    if(!removedLibrary) return res.satus(400).send('this Library with given ID is invalid, cannot be deleted');
       
   
   }

   module.exports = router;
   