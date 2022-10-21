import Consoles from './Components/Consoles/Consoles.js';
import Home from './Components/Home/Home.js'; 
import Games from './Components/Games/Games.js';
import Tshirts from './Components/Tshirts/Tshirts.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    <Router>
       <Routes>
          <Route path="/" element={<Home />} />
          {/* <main className="container"> */}
          <Route path="/consoles" element={<Consoles />} />
          <Route path="/games" element={<Games />} />
          <Route path="/tshirts" element={<Tshirts />} />
          {/* </main> */}
       </Routes>
    </Router>
    </>
  );
}


export default App;
