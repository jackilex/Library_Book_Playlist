import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar'
import SearchContainer from './components/Search'
import Card from './components/Card'
import SavedContainer from './components/Saved'
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import context from './components/Context/Context'
import deleteContext from './components/Context/Deletecontext'
import deleteBookContext from './components/Context/DeleteBookContext'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [findBook,setFindBook]=useState('')
  const [queryResult, setQueryResult]=useState([])
  const [saved, setSaved]=useState({})
  const [getCollection, setGetCollection]=useState([])
  

  function handleSearchChange(e){
  const {value}= e.target;
  setFindBook(value)
}


async function handleSubmit(){
  
  const title= await findBook.trim()
  const {data}= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle:${title}&key=AIzaSyB-_zBnjWEf3eIqv0P22htCRJIxxhA567Y`);
  if (data.totalItems > 0){
  setQueryResult(data.items)
  console.log(data.items)
  ;}


}
 
useEffect(() => {
  fetchData()
  async function fetchData(){
    const title='javscript'
  const {data}=await axios.get(`https://www.googleapis.com/books/v1/volumes?q=react+intitle:react&key=AIzaSyB-_zBnjWEf3eIqv0P22htCRJIxxhA567Y`);
 await console.log({data})
 setQueryResult(data.items);
  }
  
},[]);



useEffect(() => {

  axios.get("/api/book")
  .then(res => setGetCollection(res.data))
  .catch(err => console.log(err))

},[getCollection]);

function savingBook(saveme){
axios.post("/api/book", saveme)
.then(res => toast.success('Book Saved'))
.catch(err => toast.error(err.response.data))
}
  
function deleteIt(id){
axios.delete("/api/book/"+id)
.then(res => console.log('t be deleted'))
.catch(err => console.log(err))
// console.log(id)
}

function deleteBook(id){
  axios.delete("/api/book/delete/"+id)
  .then(res => console.log(res))
  .catch(err => console.log(err))
  // console.log(id)
  }


  return (
    
    <div>
    <ToastContainer />
    <context.Provider value={getCollection}>
    <deleteContext.Provider value={deleteIt}>
    <deleteBookContext.Provider value={deleteBook}>
      <Navbar/>
      <div className="d-flex flex-column ">
      <div id="mainContainer" className="">
      <div id="searchContainer">
      <SearchContainer 
        handleSubmit={handleSubmit}
        handleSearchChange={handleSearchChange}
        findBook={findBook}
        queryResult={queryResult}
      />
      </div>
      <div className=" testimonial-group d-flex" id="container" >
      {queryResult.length>0 && queryResult.map((oneR,index) => (
        <Card 
        key={index}
          title={oneR.volumeInfo.title}
          author={oneR.volumeInfo.authors}
          description={oneR.volumeInfo.description}
          bookId={oneR.id}
          image={oneR.volumeInfo.imageLinks ? oneR.volumeInfo.imageLinks.thumbnail : `data:image/png;base64,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`}
          publish={oneR.volumeInfo.publishedDate}
          link={oneR.volumeInfo.previewLink}
          setSaved={setSaved}
          saved={saved}
          savingBook={savingBook}
         
        />
      ))}
      </div>
      </div>
      <div>
        <SavedContainer/>
      </div>
      </div>
      </deleteBookContext.Provider>
      </deleteContext.Provider>
      </context.Provider>
    </div>
   
  );
}
//import React, { useState, useEffect } from "react";
export default App;
