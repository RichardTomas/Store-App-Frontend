import { useState, useEffect } from 'react';
import './Tshirts.css';
import TshirtCard from './TshirtCard.js';
import TshirtForm from './TshirtForm.js';

function Tshirts() {

    const [tshirts, setTshirts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedTshirt, setScopedTshirt] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/tshirts")
        .then(response => response.json())
        .then(result => setTshirts(result))
        .catch(console.log);
    }, []);

    function addClick() {
        
        setScopedTshirt({ tshirtId: 0, model: "", manufacturer: "", memoryAmount: "", processor:"", price: 0.00, quantity: 0 });
        setShowForm(true);
    }

    function notify({ action, tshirt, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            return;
        }

        switch (action) {
            case "add":
                setTshirts([...tshirts, tshirt]);
                break;
            case "edit":
                setTshirts(tshirts.map(e => {
                    if (e.tshirtId === tshirt.tshirtId) {
                        return tshirt;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedTshirt(tshirt);
                setShowForm(true);
                return;
            case "delete":
                setTshirts(tshirts.filter(e => e.tshirtId !== tshirt.tshirtId));
                break;
                default:
                tshirt.log("INVALID ACTION!" + action);
                alert("INVALID ACTION!" + action);
        }
        
        setError("");
        setShowForm(false);
    }

    if (showForm) {
        return <TshirtForm tshirt={scopedTshirt} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='tshirtTitle'>Tshirts</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Tshirt</button>
                <table id='tshirts'>
                    <tr>
                        <th>Model</th>
                        <th>Manufacturer</th>
                        <th>Memory Amount</th>
                        <th>Processor</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                    <tbody>
                        {tshirts.map(r => <TshirtCard key={r.tshirtId} tshirt={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
        </>
    )

}
export default Tshirts;