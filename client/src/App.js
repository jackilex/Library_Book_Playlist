import React, { useState, useHook, useContext } from "react";
import Navbar from './components/Navbar'
import SearchContainer from './components/Search'
import { Context } from "./components/contex"
import Card from './components/Card'
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  

  return (
    <div>
      <Navbar/>
      <SearchContainer/>
      <Card/>
    </div>
  );
}

export default App;
