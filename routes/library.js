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

    const library=Library.findById(req.params.id)
    if(library.length===0)return res.status(400).send('no libraries found')


    const thisLibrary= await Library.findById(req.params.id).populate('Book').select()
    res.send(thisLibrary)
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

    const library=await Library.findById(req.params.id)
    
    if(Object.keys(library).length === 0)return res.status(400).send('no libraries found')

    const checkBooks= await Library.findById(req.params.id).populate('Book').select('books');
    const testIt =await (checkBooks.books).some((x) => {
        if(x==req.body.book){
            return true
        }else{
            return false
        }
    
    })
    console.log(testIt)
    if(testIt === true)return res.send('book is already added to library')


    const newBook= await Library.findByIdAndUpdate(req.params.id,{$push:{"books":req.body.book}},{new: true})
    res.send(newBook)
})


router.delete('/:id'), async(req,res)=>{
    const removedLibrary= await Library.findByIdAndRemove(req.body._id);
   
    if(!removedLibrary) return res.satus(400).send('this Library with given ID is invalid, cannot be deleted');
       
   
   }

   module.exports = router;
   