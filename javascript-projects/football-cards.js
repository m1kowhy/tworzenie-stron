// script.js
const footballTeam = {
    team: "FC Legends",
    year: 1985,
    headCoach: "Alex Ferguson",
    players: [
        {
            name: "Eric Cantona",
            position: "forward",
            isCaptain: true
        },
        {
            name: "Paul Scholes",
            position: "midfielder",
            isCaptain: false
        },
        {
            name: "Rio Ferdinand",
            position: "defender",
            isCaptain: false
        },
        {
            name: "Peter Schmeichel",
            position: "goalkeeper",
            isCaptain: false
        },
        {
            name: "Ryan Giggs",
            position: "midfielder",
            isCaptain: false
        }
    ]
};

// Display team info
document.getElementById('team').textContent = footballTeam.team;
document.getElementById('year').textContent = footballTeam.year;
document.getElementById('head-coach').textContent = footballTeam.headCoach;

// Display all players initially
displayPlayers(footballTeam.players);

// Filter functionality
document.getElementById('position-filter').addEventListener('change', function() {
    const position = this.value;
    let filteredPlayers;
    
    if (position === 'all') {
        filteredPlayers = footballTeam.players;
    } else {
        filteredPlayers = footballTeam.players.filter(
            player => player.position === position
        );
    }
    
    displayPlayers(filteredPlayers);
});

function displayPlayers(players) {
    const playerCardsContainer = document.getElementById('player-cards');
    playerCardsContainer.innerHTML = '';
    
    players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.className = 'player-card';
        
        if (player.isCaptain) {
            playerCard.classList.add('captain');
        }
        
        playerCard.innerHTML = `
            <h2>${player.isCaptain ? '(Captain) ' : ''}${player.name}</h2>
            <p>Position: ${player.position}</p>
        `;
        
        playerCardsContainer.appendChild(playerCard);
    });
}
