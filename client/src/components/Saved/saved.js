import React,{useContext, useState} from 'react';
import Collection from '../Card/Collection'
import context from '../Context/Context'
import LibraryCollection from '../Library'
import { Button } from 'react-bootstrap'
import axios from "axios";

const SavedContainer = () => {

const savedCollection=useContext(context)
const [show, setShow]=useState(true)
const [showLibrary, setShowLibrary]=useState(false)
const [myLibraries, setLibraries]= useState([])
const[bookFound, setBooksFound]=useState([])
const [getLibraryBooks,setGetLibraryBooks]=useState([])

function toggle(){
  let resultForBooks= !show
  let resultForLibraries= !showLibrary
    setShow(resultForBooks)
    setShowLibrary(resultForLibraries)
    if(resultForLibraries=== true){
        getLibraries()
    }
}


function getLibraries(){
    axios.get("/api/library")
  .then(res => setLibraries(res.data))
  .catch(err => console.log(err))
    }
  
    
function getLibraryContents(e){
  const id= e.target.value
  // getThisLib(id)
  
  getTheBooks(["5f62f26dfd913f4dcc9717f2", "5f62e54c27a92e49d009c302"])
}

function getThisLib(id){
  axios.get("/api/library/"+id)
  .then(res => console.log(res.data.books))
  .catch(err => console.log(err))
  console.log(id)
  }
  
  function getTheBooks(array){
    
    axios.get("/api/book/"+array).then(resArr => console.log(resArr))
    // axios.all([
    //   array.map(x =>{
    //     axios.get("/api/books/"+x)
    //   })
      
    // ]).then(resArr => console.log(resArr))
   
    }


    return ( 
        <div>
    <div className="d-flex justify-content-around pt-2">
        <Button name="show" disabled={show && true} value={show} onClick={toggle}>Book Saved</Button>
        <Button disabled={showLibrary && true} onClick={toggle} >Library</Button>
    </div>
    {show && <div id="collection-container">
      {savedCollection.length>0 && savedCollection.map( one => (
    <Collection 
    key={one._id}
    title={one.title}
    author={one.author}
    description={one.description}
    bookId={one.bookId}
    image={one.image}
    publish={one.publish}
    link={one.link}
    _id={one._id}
    getLibraries={getLibraries}
    myLibraries={myLibraries}
    />
      ) ) }
        
    </div>}
    {showLibrary &&<div className="pt-4 ">
        <LibraryCollection   getLibraries={getLibraries}/>
    </div>
    }
    {showLibrary && <div className="pt-2 d-flex justify-content-center flex-direction-column justify-content-center">
    {myLibraries.map(oneL =>(
        <Button className="mb-2 mr-2 bg-success border-0 " 
        key={oneL._id}
        value={oneL._id}
        onClick={getLibraryContents}
        >{oneL.name}</Button>
    ))}
    <div>
        {/* cards go here */}

    </div>
    <div>


    </div>
    </div>}
    </div>
     );
}
 
export default SavedContainer;