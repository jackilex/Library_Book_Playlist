import React, { useState, useContext } from "react";
import { Button, Collapse } from 'react-bootstrap'
import deleteContext from '../Context/Deletecontext'


const Collection = (props) => {

  
    const [open, setOpen] = useState(false);
    const deletedCollection=useContext(deleteContext)

    const collectionId=props._id

    function handleDropDown(){
        setOpen(!open) 
    }

    let img=40
   
    return ( 
        <div className="card text-white bg-primary mb-3 mr-4 mt-5" style={{height: "26rem", width:"18rem"}}>
        <img src={props.image} className="card-img-top" style={{height:"12rem"}} />
            <div className="card-body" >
                <p className="card-title">Title: {props.title} <br/> Author:{props.author} </p>
                {/* <p className="card-text">Published: {props.publish} </p> */}
                
                <Button
                    onClick={handleDropDown}
                    aria-controls="example-collapse-text"
                 aria-expanded={open}
                >
                 Read Desctiption
                </Button>    
                <Collapse in={open}>
                <div d="example-collapse-text">description: {props.description}</div>
                </Collapse>

                <Button href={props.link} target="_blank">View</Button>
                <Button  
                 target="_blank"
                 onClick={()=>deletedCollection(collectionId)}
                 >
                 
                 Remove
                 </Button>
            </div>
    </div>
     );
}
 
export default Collection;