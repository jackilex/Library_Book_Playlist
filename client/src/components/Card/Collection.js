import React, { useContext, useEffect, useState } from "react";
import { Button} from 'react-bootstrap'
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify';
import 'reactjs-popup/dist/index.css'
// import deleteContext from '../Context/Deletecontext'
import deleteBookContext from './../Context/DeleteBookContext';
import axios from "axios";



const Collection = (props) => {

  const [choice, setChoice]=useState([])
    


    const deleteBook=useContext(deleteBookContext)
    const collectionId=props._id

    useEffect(() => {
        axios.get("/api/library")
        .then(res => setChoice(res.data))
        .catch(err => console.log(err))
      },[]);
   
      function handleChange(e){
          const lib= (e.target.value.split(','))[0];
          const book=(e.target.value.split(','))[1];
          
        // console.log(lib,book)
          axios.put("/api/library/"+lib,{book:book})
        .then(res => console.log(res))
        .catch(err => toast.error(err.response.data))
          
      }

 
   
    return ( 
        <div id="collectionCard" className="text-white bg-primary mb-3 mr-4 mt-5 pt-2" style={{ width:"15rem"}}>
        <div className="d-flex justify-content-center">
        <img src={props.image} className="card-img-top" style={{height:"10rem", width:"10rem"}} alt="cover"/>
        </div>  
            <div className="card-body" >
                <p className="card-title"><span className="font-weight-bold">TITLE</span>:{' '}{props.title}</p>
                <p className="card-text"><span className="font-weight-bold"> AUTHOR(S)</span>:{" "}{props.author}  </p> 
                <p className="card-text"><span className="font-weight-bold">Published</span>:{' '} {props.publish} </p>
                
                <Popup trigger={<Button>Read Desctiption</Button>} position="center">    
                <div id="popup" >description: {props.description}</div>
                </Popup>

                <Button href={props.link} target="_blank">View</Button>
                <div className="d-flex">

                <Popup trigger={<Button onClick={()=>props.getLibraries} target="_blank">
                + TO LIBRARY
                </Button>}position="center bottom">
                <label htmlFor="choice">Choose a library:</label>
                <select onChange={handleChange}>
                <option>{'Your Libraries'}</option>
                        {choice && choice.map((lib,i) =>(
                            <option key={i} value={[lib._id,props._id]} >{lib.name}</option>
                        ))}
                </select>
                </Popup>
                
                
                <Button  
                 target="_blank"
                 onClick={()=>deleteBook(collectionId)}
                 >
                 DELETE BOOK
                 </Button>
                 </div>
            </div>
    </div>
     );
}
 
export default Collection;