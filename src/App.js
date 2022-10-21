// import logo from './logo.svg';
// import './App.css';
import Consoles from './Components/Consoles/Consoles.js';
//import {Route, Router, Routes} from "react-router-dom";
import Home from './Components/Home/Home.js'; 
//import { Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <Router>
       <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
       </Routes>
    </Router>
    <main className="container">
      <Consoles />
    </main>
    </>
  );
}


export default App;
