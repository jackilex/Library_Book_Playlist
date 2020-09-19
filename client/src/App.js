import React, { useState, useEffect } from "react";
import Navbar from './components/Navbar'
import SearchContainer from './components/Search'
import Card from './components/Card'
import SavedContainer from './components/Saved'
import axios from "axios";
import context from './components/Context/Context'
import deleteContext from './components/Context/Deletecontext'
import 'bootstrap/dist/css/bootstrap.min.css';


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
  await setQueryResult(data.items);

}
    

useEffect(() => {

  axios.get("/api/book")
  .then(res => setGetCollection(res.data))
  .catch(err => console.log(err))

},[getCollection]);

function savingBook(saveme){
axios.post("/api/book", saveme)
.then(res => console.log(res))
.catch(err => console.log(err))
}
  
function deleteIt(id){
axios.delete("/api/book/"+id)
.then(res => console.log('t be deleted'))
.catch(err => console.log(err))
console.log(id)
}



  return (
    
    <div>
    <context.Provider value={getCollection}>
    <deleteContext.Provider value={deleteIt}>
      <Navbar/>
      <div className="d-flex flex-column ">
      <div className="ml-3 ">
      <SearchContainer 
        handleSubmit={handleSubmit}
        handleSearchChange={handleSearchChange}
        findBook={findBook}
        queryResult={queryResult}
      />
      <div className=" testimonial-group d-flex" id="container" >
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
         
        />
      ))}
      </div>
      </div>
      <div>
        <SavedContainer/>
      </div>
      </div>
      </deleteContext.Provider>
      </context.Provider>
    </div>
   
  );
}
//import React, { useState, useEffect } from "react";
export default App;
