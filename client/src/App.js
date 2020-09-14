import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar'
import SearchContainer from './components/Search'
import Card from './components/Card'
import SavedContainer from './components/Saved'
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  
  const [findBook,setFindBook]=useState('')
  const [queryResult, setQueryResult]=useState([])
  const [newBook,setNewBook]=useState({})
function handleSearchChange(e){
  const {value}= e.target;
  setFindBook(value)
}

async function handleSubmit(){
  
  const title= await findBook.trim()
  const {data}= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle:${title}&key=AIzaSyB-_zBnjWEf3eIqv0P22htCRJIxxhA567Y`);
  console.log(data.items)
  await setQueryResult(data.items);
  

}
    
  
function onBooksave(e){
  // const {target}=e
// console.log(target.value)
// setNewBook(e.target.value)
axios.post("/api/book", e.target.value)
.then(res => console.log(res))
.catch(err => console.log(err))

}


  


  return (
    <div>
      <Navbar/>
      <div className="d-flex ">
      <div className="ml-3">
      <SearchContainer 
        handleSubmit={handleSubmit}
        handleSearchChange={handleSearchChange}
        findBook={findBook}
        queryResult={queryResult}
      />
      {queryResult.length>0 && queryResult.map((oneR,index) => (
        <Card
        key={index}
          title={oneR.volumeInfo.title}
          author={oneR.volumeInfo.authors}
          description={oneR.volumeInfo.description}
          bookId={oneR.volumeInfo.id}
          image={oneR.volumeInfo.imageLinks.smallThumbnail}
          publish={oneR.volumeInfo.publishedDate}
          link={oneR.volumeInfo.previewLink}
          onBooksave={onBooksave}
        />
      ))}
      </div>
      <div>
        <SavedContainer/>
      </div>
      </div>
    </div>
  );
}
//import React, { useState, useEffect } from "react";
export default App;
