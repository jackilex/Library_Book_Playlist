import React from "react";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import { Button } from 'react-bootstrap'

const Card = (props) => {


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
    props.setSaved(thisObj);
    props.savingBook(thisObj)
     props.getBook()
    }


    return ( 
    <div className=" text-white pb-5 mr-4 mt-5" id="card" >
        <img src={props.image} className="card-img-top" style={{width: "10rem", height:"9rem"}} alt="cover" />
            <div  id="card-body" className="mb-2">
                <p id="p"><span className="font-weight-bold">TITLE</span>:{' '}{props.title}</p> 
                <p className="d-flex flex-wrap"><span className="font-weight-bold"> AUTHOR(S)</span>:{" "}{props.author} </p>
                <p className="card-text"><span className="font-weight-bold">Published</span>:{' '} {props.publish} </p>
                <div id="button-container" >
                <Popup id="popContainer" trigger={<Button id="button" className="btn-warning border-0">Read Desctiption</Button>} position="center">    
                <div id="popup" >DESCRIPTION: {props.description}</div>
                </Popup>
                <Button id="button" className="btn-warning border-0" href={props.link} target="_blank">View</Button>
                <Button id="button" className="btn-warning border-0" onClick={thisBook} 
                 target="_blank">
                 {button}
                 </Button>
                 </div>
            </div>
    </div>
     );
}
 
export default Card;