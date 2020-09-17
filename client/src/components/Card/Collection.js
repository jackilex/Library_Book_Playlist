import React, { useContext } from "react";
import { Button} from 'react-bootstrap'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import deleteContext from '../Context/Deletecontext'


const Collection = (props) => {

  
    
    const deletedCollection=useContext(deleteContext)

    const collectionId=props._id

    

    let img=40
   
    return ( 
        <div className="text-white bg-primary mb-3 mr-4 mt-5" style={{ width:"15rem"}}>
        <div className="d-flex justify-content-center">
        <img src={props.image} className="card-img-top" style={{height:"10rem", width:"10rem"}} alt="cover"/>
        </div>  
            <div className="card-body" >
                <p className="card-title">Title: {props.title} <br/> Author:{props.author} </p>
                {/* <p className="card-text">Published: {props.publish} </p> */}
                
                <Popup trigger={<Button>Read Desctiption</Button>} position="center">    
                <div id="popup" >description: {props.description}</div>
                </Popup>

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