import React, { useState } from "react";
import { Button, Collapse} from 'react-bootstrap'
import axios from "axios";


const LibraryCollection = (props) => {
    const [open, setOpen] = useState(false);
    const [form,setForm]= useState('')

    function handleDropDown(){
        setOpen(!open) 
    }

    function handleSave(){
        post(form)
        handleDropDown()
        props.getLibraries()
    }

    function handleFormChange(e){
        const {value}=e.target;
        setForm(value);
        
     }

     function post(saveme){
         const name={name:saveme}
        axios.post("/api/library",name)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }



    return ( 
        <div className="d-flex justify-content-center">
        <div className="d-flex flex-column">
            <Button className="bg-warning border-0"
            onClick={handleDropDown}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            >
            + add a Library</Button>
            <Collapse in={open} >
            <div className="pt-2">
            <input className="mb-2" 
            onChange={handleFormChange}
            value={form} type="text" placeholder="enter Library name"></input>
            <Button 
            onClick={handleSave}
            >Save Library</Button>
            </div>
            </Collapse>
        </div>
        </div>
     );
}
 
export default LibraryCollection;