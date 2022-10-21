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
        
        setScopedTshirt({ t_shirt_id: 0, color: "", size: "", description: "", price: 0.00, quantity: 0 });
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
                    if (e.t_shirt_id === tshirt.t_shirt_id) {
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
                setTshirts(tshirts.filter(e => e.t_shirt_id !== tshirt.t_shirt_id));
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
                        <th>Color</th>
                        <th>Size</th>
                        <th>Description</th>
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