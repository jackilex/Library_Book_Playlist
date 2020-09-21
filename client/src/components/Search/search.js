import React from "react";

const Search = (props) => {

    return ( 
    <div className="flex-grow-1">
        <label htmlFor="search">Search</label>
        <input className="search"
        onChange={props.handleSearchChange} 
        type='text' 
        placeholder="By Book Title"
        name="findbook"
        value={props.findBook}
        ></input>
        <button id="send" className="btn btn-success ml-1" type="button" onClick={()=>props.handleSubmit()} >Send</button>
    </div>
     );
}
 
export default Search;