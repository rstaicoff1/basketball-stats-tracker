const nameInput = document.getElementById("nameInput");
const teamInput = document.getElementById("teamInput");
const positionInput = document.getElementById("positionInput");

const pointsInput = document.getElementById("pointsInput");
const reboundsInput = document.getElementById("reboundsInput");
const assistsInput = document.getElementById("assistsInput");
const stealsInput = document.getElementById("stealsInput");
const blocksInput = document.getElementById("blocksInput");
const fgInput = document.getElementById("fgInput");

const addPlayerButton = document.getElementById("addPlayerButton");
const loadPlayersButton = document.getElementById("loadPlayersButton");
const playersList = document.getElementById("playersList");
const searchInput = document.getElementById("searchInput");
const playerCount = document.getElementById("playerCount");
const message = document.getElementById("message");

let players = [];

function loadPlayers() {
  fetch("http://localhost:3000/players/stats")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      players = data;
      renderPlayers();
    });
}

function addPlayer() {
  const newPlayer = {
    name: nameInput.value.trim(),
    team: teamInput.value.trim(),
    position: positionInput.value.trim(),
    points: Number(pointsInput.value),
    rebounds: Number(reboundsInput.value),
    assists: Number(assistsInput.value),
    steals: Number(stealsInput.value),
    blocks: Number(blocksInput.value),
    fieldGoalPercentage: Number(fgInput.value)
  };

  if (!newPlayer.name || !newPlayer.team || !newPlayer.position) {
    message.textContent = "Name, team, and position are required.";
    return;
  }

  fetch("http://localhost:3000/players/stats", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newPlayer)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(createdPlayer) {
      players.push(createdPlayer);
      renderPlayers();
      clearInputs();
      message.textContent = "Player added successfully.";
    });
}

function renderPlayers() {
  playersList.innerHTML = "";

  const searchText = searchInput.value.toLowerCase();

  const filteredPlayers = players.filter(function(player) {
    return (
      player.name.toLowerCase().includes(searchText) ||
      player.team.toLowerCase().includes(searchText)
    );
  });

  playerCount.textContent = "Total players: " + players.length;

  filteredPlayers.forEach(function(player) {
    const playerCard = document.createElement("div");
    playerCard.className = "player-card";

    playerCard.innerHTML = `
      <h3>${player.name}</h3>
      <p><strong>Team:</strong> ${player.team}</p>
      <p><strong>Position:</strong> ${player.position}</p>
      <p><strong>Points:</strong> ${player.points}</p>
      <p><strong>Rebounds:</strong> ${player.rebounds}</p>
      <p><strong>Assists:</strong> ${player.assists}</p>
      <p><strong>Steals:</strong> ${player.steals}</p>
      <p><strong>Blocks:</strong> ${player.blocks}</p>
      <p><strong>FG%:</strong> ${player.fieldGoalPercentage}</p>
    `;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    editButton.addEventListener("click", function() {
      editPlayer(player);
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function() {
      deletePlayer(player.id);
    });

    playerCard.appendChild(editButton);
    playerCard.appendChild(deleteButton);

    playersList.appendChild(playerCard);
  });
}

function editPlayer(player) {
  const updatedName = prompt("Edit name:", player.name);
  const updatedTeam = prompt("Edit team:", player.team);
  const updatedPosition = prompt("Edit position:", player.position);

  if (!updatedName || !updatedTeam || !updatedPosition) {
    return;
  }

  const updatedPlayer = {
    name: updatedName.trim(),
    team: updatedTeam.trim(),
    position: updatedPosition.trim(),
    points: player.points,
    rebounds: player.rebounds,
    assists: player.assists,
    steals: player.steals,
    blocks: player.blocks,
    fieldGoalPercentage: player.fieldGoalPercentage
  };

  fetch("http://localhost:3000/players/stats/" + player.id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedPlayer)
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(updatedFromBackend) {
      players = players.map(function(currentPlayer) {
        if (currentPlayer.id === player.id) {
          return updatedFromBackend;
        }

        return currentPlayer;
      });

      renderPlayers();
    });
}

function deletePlayer(id) {
  fetch("http://localhost:3000/players/stats/" + id, {
    method: "DELETE"
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(deletedPlayer) {
      players = players.filter(function(player) {
        return player.id !== id;
      });

      renderPlayers();
    });
}

function clearInputs() {
  nameInput.value = "";
  teamInput.value = "";
  positionInput.value = "";
  pointsInput.value = "";
  reboundsInput.value = "";
  assistsInput.value = "";
  stealsInput.value = "";
  blocksInput.value = "";
  fgInput.value = "";

  nameInput.focus();
}

addPlayerButton.addEventListener("click", addPlayer);
loadPlayersButton.addEventListener("click", loadPlayers);

searchInput.addEventListener("input", function() {
  renderPlayers();
});