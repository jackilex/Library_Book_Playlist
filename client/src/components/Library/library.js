import React, { useState, useEffect } from "react";
import { Button, Collapse} from 'react-bootstrap'
import axios from "axios";
import Popup from 'reactjs-popup';
import deleteBookContext from './../Context/DeleteBookContext';
import { toast } from 'react-toastify';
import 'reactjs-popup/dist/index.css'

const LibraryCollection = (props) => {
    const [open, setOpen] = useState(false);
    const [form,setForm]= useState('')
    const [deleteChoice, setDeleteChoice]=useState([])


    function handleDropDown(){
        setOpen(!open) 
    }

    function handleSave(){
        props.setLibraries([])
        post(form)
        handleDropDown()
        props.getLibraries()
        getDropDownLib()
    }

    function handleFormChange(e){
        const {value}=e.target;
        setForm(value);
        
     }

     function post(saveme){
         const name={name:saveme}
        axios.post("/api/library",name)
        .then(res => res)
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getDropDownLib()
      },[]);
   

    async function handleChange(e){
        const lib=await (e.target.value.split(','))[0];
        deleteLib(lib)
        props.getLibraries()
        props.setGetLibraryBooks([])
    }


function deleteLib(id){
axios.delete("/api/library/delete/"+id)
.then(res =>{ 
  console.log(res)
  toast.success('book is removed')})
.catch(err => console.log(err))
    }
function getDropDownLib(){
    console.log('run')
    axios.get("/api/library")
    .then(res => setDeleteChoice(res.data))
    .catch(err => console.log(err))
}

    return ( 
        <div className="d-flex justify-content-around">
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
        <div>
        <Popup trigger={<Button id="danger" className="border-0"
        
         target="_blank">
                Delete a Library
                </Button>}position="center bottom">
                <label htmlFor="choice">Choose a library:</label>
                <select onChange={handleChange}>
                <option>{'Your Libraries'}</option>
                        {deleteChoice && deleteChoice.map((lib,i) =>(
                            <option key={i} value={[lib._id,props._id,lib.name]} >{lib.name}</option>
                        ))}
                </select>
                </Popup>
        </div>
        </div>
     );
}
 
export default LibraryCollection;