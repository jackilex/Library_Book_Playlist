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
    console.log('working')
     props.setSaved(thisObj);
     props.savingBook(thisObj)
     
    }


    return ( 
    <div className=" text-white mb-3 mr-4 mt-5" id="card" >
        <img src={props.image} className="card-img-top" style={{width: "10rem", height:"10rem"}} alt="cover" />
            <div  id="card-body">
                <p id="p">TITLE: {props.title}</p> 
                <p> AUTHOR(S):{props.author} </p>
                {/* <p className="card-text">Published: {props.publish} </p> */}
                <div id="button-container">
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