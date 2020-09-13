import React, { useState, useEffect } from "react";
import Search from './search'
import { Context } from "../../components/contex";
import axios from "axios";

const SearchContainer= () => {

    const [findBook,setFindBook]=useState('')
    const [queryResult, setQueryResult]=useState()

function handleSearchChange(e){
    const {name,value}= e.target;
    setFindBook(value)
}

async function handleSubmit(){
      const title= await findBook.trim()
      const {data}= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${title}+intitle:${title}&key=AIzaSyB-_zBnjWEf3eIqv0P22htCRJIxxhA567Y`)
      console.log(data.items)
      setQueryResult(data.items)
}

// useEffect(async ()=>{
//     // const title= await queryResult.trim()
//     const {data}= await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${queryResult}+intitle:${queryResult}&key=AIzaSyB-_zBnjWEf3eIqv0P22htCRJIxxhA567Y`)
//     console.log(data.items)
//     setQueryResult(data.items)

// },[])
    
    return ( 
        <div className="d-flex justify-content-around">
            <Search 
            handleSubmit={handleSubmit}
            handleSearchChange={handleSearchChange}
            handleSubmit={handleSubmit}
            findBook={findBook}
             />
            <div className="d-flex justify-content-around flex-grow-1">
                <li className="list-group-item">Saved</li>
                <li className="list-group-item">Library</li>
            </div>
        </div>
     );
}
 
export default SearchContainer