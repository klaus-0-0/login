/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import axios from 'axios';
import "./App.css"
import {v4 as uniqueID} from 'uuid'
import Signup from "./component/Signup"
import { BrowserRouter, Route, Routes} from "react-router-dom"
import Fetch from './component/Fetch';
import Signin from './component/Signin';


const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/signup' element = { <Signup />}></Route>
        <Route path='/fetch' element = { <Fetch />}></Route>
        <Route path='/signin' element = { <Signin />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
