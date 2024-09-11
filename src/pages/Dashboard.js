import React, { useEffect, useState } from 'react';
import './Styles.css';
const Dashboard = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        fetch('/api/games/')
            .then(response => response.json())
            .then(data => setGames(data));
    }, []);
// Example function to add a new game
const addGame = () => {
    const newGame = {
        title: "New Game",
        description: "Game description",
        bundle_name: "New Bundle",
        created_by: 1, // assuming 1 is the ID of the current user
    };

    fetch('/api/games/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGame),
    }).then(response => {
        if (response.ok) {
            // Reload games after adding a new one
            fetch('/api/games/')
                .then(response => response.json())
                .then(data => setGames(data));
        }
    });
};

// Example function to delete a game
const deleteGame = (id) => {
    fetch(`/api/games/${id}/`, {
        method: 'DELETE',
    }).then(response => {
        if (response.ok) {
            // Reload games after deleting one
            setGames(games.filter(game => game.id !== id));
        }
    });
};
    return (
        <div className="dashboard">
            <h2>My Activities</h2>
            <div className="games">
                {games.map((game) => (
                    <div className="game-card" key={game.id}>
                        <h3>{game.title}</h3>
                        <p>{game.description}</p>
                        <p>Bundle: {game.bundle_name}</p>
                        <p>Last Played: {new Date(game.last_played).toLocaleDateString()}</p>
                        <p>Created on: {new Date(game.date_created).toLocaleDateString()}</p>
                    </div>
                ))}
                <div className="add-game-card">
                    <button>Add Game</button>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;