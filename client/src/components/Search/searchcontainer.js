import React from "react";
import Search from './search'
import Card from '../Card/Card'


const SearchContainer= (props) => {

    
    return ( 
        <div className="d-flex justify-content-around ml-3">
        <div >
            <Search 
            handleSubmit={props.handleSubmit}
            handleSearchChange={props.handleSearchChange}
            findBook={props.findBook}
             />
        </div>
        <div className="pl-3">
        {props.querResult && <Card/>}
        </div>
        </div>
     );
}
 
export default SearchContainer