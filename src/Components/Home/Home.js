import './Home.css'
import {NavLink } from 'react-router-dom';

const Home = ()=>{
    return (
        <>
        <main className="container">
        <NavLink to="/consoles">
        <button className="button" id="buttonOne">Consoles</button>
        </NavLink>
        <NavLink to="/games">
        <button className="button" id="buttoneTwo">Games</button>
        </NavLink>
        <NavLink to="tshirts">
        <button className="button" id="buttonThree">Tshirts</button>
        </NavLink>
        </main>
        </>
    )
}
export default Home;