import React from "react";

const Search = (props) => {

    return ( 
    <div className="flex-grow-1">
        <label htmlFor="search">Search</label>
        <input className="search"
        onChange={props.handleSearchChange} 
        type='text' 
        placeholder="Find a book"
        name="findbook"
        value={props.findBook}
        ></input>
        <button className="btn btn-success" type="button" onClick={()=>props.handleSubmit()} >Send</button>
    </div>
     );
}
 
export default Search;