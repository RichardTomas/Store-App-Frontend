import {NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './Games.css';
import GameCard from './GameCard.js';
import GameForm from './GameForm.js';

function Games() {

    const [games, setGames] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [scopedGame, setScopedGame] = useState({});
    const [error, setError] = useState();

    useEffect(() => {
        fetch("http://localhost:8080/games")
        .then(response => response.json())
        .then(result => setGames(result))
        .catch(console.log);
    }, []);

    function addClick() {
        
        setScopedGame({ gameId: 0, title: "", esrb: "", description: "", price:0.00, studio: "", quantity: 0 });
        setShowForm(true);
    }

    function notify({ action, game, error }) {

        if (error) {
            setError(error);
            setShowForm(false);
            alert("There was an error: " + error)
            return;
        }

        switch (action) {
            case "add":
                setGames([...games, game]);
                break;
            case "edit":
                setGames(games.map(e => {
                    if (e.gameId === game.gameId) {
                        return game;
                    }
                    return e;
                }));
                break;
            case "edit-form":
                setScopedGame(game);
                setShowForm(true);
                return;
            case "delete":
                setGames(games.filter(e => e.gameId !== game.gameId));
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
        return <GameForm game={scopedGame} notify={notify} />
    }

    return (
        <>
            {error && <div className="alert alert-danger">{error}</div>}
            <div>
                <h1 id='gameTitle'>Games</h1>
                <button className="btn btn-primary" type="button" onClick={addClick}>Add a Game</button>
                <table id='games'>
                    <tr>
                        <th>Title</th>
                        <th>ESRB Rating</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Studio</th>
                        <th>Quantity</th>
                    </tr>
                    <tbody>
                        {games.map(r => <GameCard key={r.gameId} game={r} notify={notify} />)}
                    </tbody>
                </table>
            </div>
            <NavLink to="/">
           <button>Home</button>
           </NavLink>
        </>
    )

}
export default Games;