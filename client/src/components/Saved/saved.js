import React,{useContext, useState} from 'react';
import Collection from '../Card/Collection'
import context from '../Context/Context'
import LibraryCollection from '../Library'
import LibraryCards from '../Card/LibraryCards'
import { Button } from 'react-bootstrap'
import axios from "axios";



const SavedContainer = () => {

const savedCollection=useContext(context)
const [show, setShow]=useState(true)
const [showLibrary, setShowLibrary]=useState(false)
const [myLibraries, setLibraries]= useState([])
const [getLibraryBooks,setGetLibraryBooks]=useState([])
const [reloadOnDelete, setReloadOnDelete]=useState('')

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
  
    
async function getLibraryContents(e){
  const id= e.target.value
  setReloadOnDelete(id)
  getThisLib(id)

}

function getThisLib(id){
  axios.get("/api/library/"+id)
  .then(res => {
    filter(savedCollection,res.data.books)
  })
  .catch(err => console.log(err))
  console.log(id)
  }
  



async function filter(all,want){
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
        // onClick={filter}
        >{oneL.name}</Button>
    ))}
  
  
    </div>}

    <div>
    {showLibrary && <div className="d-flex flex-direction-column">
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
    reloadOnDelete={reloadOnDelete}
    getThisLib={getThisLib}
    
          />
        ))}
    </div>}

    </div>
    </div>
     );
}
 
export default SavedContainer;