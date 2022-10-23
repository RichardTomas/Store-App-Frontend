import { useState, useEffect } from 'react';
import './Consoles.css';
import ConsoleCard from './ConsoleCard.js';
import ConsoleForm from './ConsoleForm.js';
import {NavLink } from 'react-router-dom';

function Consoles() {

    const [consoles, setConsoles] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedConsole, setScopedConsole] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/consoles")
        .then(response => response.json())
        .then(result => setConsoles(result))
        .catch(console.log);
    }, []);

    function addClick() {
        
        setScopedConsole({ consoleId: 0, model: "", manufacturer: "", memoryAmount: "", processor:"", price: 0.00, quantity: 0 });
        setShowForm(true);
    }

    function notify({ action, console, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            alert("There was an error: " + error)
            return;
        }

        switch (action) {
            case "add":
                setConsoles([...consoles, console]);
                break;
            case "edit":
                setConsoles(consoles.map(e => {
                    if (e.consoleId === console.consoleId) {
                        return console;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedConsole(console);
                setShowForm(true);
                return;
            case "delete":
                setConsoles(consoles.filter(e => e.consoleId !== console.consoleId));
                break;
                //There was no case for cancel
            case "cancel":
                setShowForm(false);
                break;
            default:
                console.log("INVALID ACTION!" + action);
                alert("INVALID ACTION!" + action);

        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <ConsoleForm console={scopedConsole} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='consoleTitle'>Consoles</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Console</button>
                <table id='consoles'>
                    <tr>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Memory Amount</th>
                        <th>Processor</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    <tbody>
                        {consoles.map(r => <ConsoleCard key={r.consoleId} console={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
            <NavLink to="/">
           <button>Home</button>
           </NavLink>
        </>
    )

}
export default Consoles;