import React,{useContext, useState} from 'react';
import Collection from '../Card/Collection'
import context from '../Context/Context'
import LibraryCollection from '../Library/Library'
import LibraryCards from '../Card/LibraryCards'
import { Button } from 'react-bootstrap'
import axios from "axios";
import { toast } from 'react-toastify';



const SavedContainer = (props) => {

const savedCollection=useContext(context)
const [show, setShow]=useState(true)
const [showLibrary, setShowLibrary]=useState(false)
const [myLibraries, setLibraries]= useState([])
const [getLibraryBooks,setGetLibraryBooks]=useState([])
const [currentLibrary, setCurrentLibrary]=useState('')
const [libId, setLibId]=useState('')


function toggle(){
  let resultForBooks= !show
  let resultForLibraries= !showLibrary
    setShow(resultForBooks)
    setShowLibrary(resultForLibraries)
  if(resultForBooks ==true){
    setLibraries([])
  }
    
    if(resultForLibraries== true){
        getLibraries()
        // console.log(getLibraryBooks)
        setGetLibraryBooks([])
    }
}


function getLibraries(){
    axios.get("/api/library")
  .then(res => setLibraries(res.data))
  .catch(err => setLibraries([]))
    }
  
    
async function getLibraryContents(e){
  
  console.log(e.currentTarget.name)
  getThisLib( e.currentTarget.name)
setCurrentLibrary( e.currentTarget.name) 
  
 

}

function getThisLib(id){
  
  axios.get("/api/library/"+id)
  .then(res => {
    filter(savedCollection,res.data.books)
  })
  .catch(err => {
    toast.error('Whoops! something went wrong. WAIT and Tap Library again to retry')
    

  })
 
  }
  



function filter(all,want){
  let send=[]
// all.filter(x=> console.log(x===want[0]))
all.map(x =>{
  let id=x._id
  want.map(y => {
    if(y==id){
      send.push(x)  
    }
  })
})

setGetLibraryBooks(send)
if(send.length===0){
  toast.info("No book added to this library yet")
}


}



    return ( 
        <div id="library-container" >
    <div id="bookNav" className="d-flex justify-content-center pb-2 pt-2">
        <Button id="navB" className="border-0" name="show" disabled={show && true} value={show} onClick={toggle}>Book Saved</Button>
        <Button id="navB" className="border-0" disabled={showLibrary && true} onClick={toggle} >Library</Button>
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
    getBook={props.getBook}
    />
      ) ) }
        
    </div>}
    {showLibrary &&<div className="pt-4 ">
        <LibraryCollection  setLibraries={setLibraries} getLibraries={getLibraries} setGetLibraryBooks={setGetLibraryBooks}/>
    </div>
    }
    {showLibrary && <div className="pt-2 d-flex justify-content-center flex-direction-column justify-content-center">
    {myLibraries.length>0 && myLibraries.map(oneL =>(
        <Button className="mb-2 mr-2 bg-success border-0 " 
        key={oneL._id}
        name={oneL._id}
        onClick={getLibraryContents}
         
        // onClick={filter}
        ><img src="https://img.icons8.com/offices/30/000000/book-shelf.png"/>{oneL.name}</Button>
    ))}
  
  
    </div>}

    <div className="d-flex flex-direction-row justify-content-center">
    {showLibrary && <div className="d-flex flex-direction-row justify-content-center flex-wrap" >
        {/* cards go here */}
        {getLibraryBooks.length>0 && getLibraryBooks.map((oneB,i) =>(
          <LibraryCards
    key={i}
    title={oneB.title}
    author={oneB.author}
    description={oneB.description}
    bookId={oneB.bookId}
    image={oneB.image}
    publish={oneB.publish}
    link={oneB.link}
    _id={oneB._id}
    getLibraries={getLibraries}
    myLibraries={myLibraries}
    getThisLib={getThisLib}
    currentLibrary={currentLibrary}
          />
        ))}
    </div>}

    </div>
    </div>
     );
}
 
export default SavedContainer;