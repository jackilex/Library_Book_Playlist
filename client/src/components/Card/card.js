import React, { useState } from "react";
import { Button, Collapse } from 'react-bootstrap'

const Card = (props) => {
    const [open, setOpen] = useState(false);

    let authors="NA"
    let description="NA"
    let button="Save"
    if(typeof props.author!== "undefined"){
        stringify(props.author)
    }
    if(typeof props.description !== "undefined"){
        description=props.description
    }

    function stringify(a){
    let array= a
    authors=array.join(',')
    return authors
    }
 

    const thisObj={
    title:props.title,
    author:authors,
    description:description,
    bookId:props.bookId,
    image:props.image,
    link:props.link,
    publish:props.publish
}


     function thisBook(){
    console.log('working')
     props.setSaved(thisObj);
     props.savingBook(thisObj)
     
    }

function handleDropDown(){
    setOpen(!open) 
}
    return ( 
    <div className="card text-white bg-primary mb-3 mr-4 mt-5" id="card" style={{width: "15rem"}}>
        <img src={props.image} className="card-img-top" style={{width: "10rem", height:"10rem"}} />
            <div className="card-body " style={{width: "26rem"}}>
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
                <Button onClick={thisBook} 
                 target="_blank">
                 {button}
                 </Button>
            </div>
    </div>
     );
}
 
export default Card;