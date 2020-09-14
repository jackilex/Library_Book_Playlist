import React, { useState } from "react";
import { Button, Collapse } from 'react-bootstrap'

const Card = (props) => {
    const [open, setOpen] = useState(false);
   


function handleDropDown(){
    setOpen(!open) 
}
    return ( 
    <div className="card text-white bg-primary mb-3 mr-4 mt-5" style={{width: "18rem"}}>
        <img src={props.image} className="card-img-top" />
            <div className="card-body">
                <p className="card-title">Title: {props.title} <br/> Author:{props.author} </p>
                <p className="card-text">Published: {props.publish} </p>
                
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
                <Button onClick={onSave} 
                // value={saved}
                 target="_blank">
                 save
                 </Button>
            </div>
    </div>
     );
}
 
export default Card;