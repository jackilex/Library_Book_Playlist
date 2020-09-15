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
  const [saved, setSaved]=useState({})

function handleSearchChange(e){
  const {value}= e.target;
  setFindBook(value)
}

// const test={
// 	title:"next book",
//     author:"req.body.authors",
//     description:"req.body.description",
//     bookId:"15644",
//     image:"req.body.image",
//     link:"www",
//     publish:"202"
// }

async function handleSubmit(){
  
  const title= await findBook.trim()
  const {data}= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle:${title}&key=AIzaSyB-_zBnjWEf3eIqv0P22htCRJIxxhA567Y`);
  console.log(data.items)
  await setQueryResult(data.items);
  

}
    
  
// async function onBooksave(e){
//   const {target}=e

// const result=target.value
// console.log(target.value)
// // await setNewBook(result)
// // testing(result)
// console.log(JSON.stringify(result))
// testObject(target.value)
// }

// useEffect(() => {

//   // testing(saved)

// // console.log(JSON.stringify(saved))
// testObject(saved)
// },[saved]);

function savingBook(saveme){
axios.post("/api/book", saveme)
.then(res => console.log(res))
.catch(err => console.log(err))
}
  
// function testObject(obj){
//   for (let x in obj){
//     console.log(obj[x])
//   }
// }



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
          bookId={oneR.id}
          image={oneR.volumeInfo.imageLinks.smallThumbnail}
          publish={oneR.volumeInfo.publishedDate}
          link={oneR.volumeInfo.previewLink}
          setSaved={setSaved}
          saved={saved}
          savingBook={savingBook}
          // onBooksave={onBooksave}
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
