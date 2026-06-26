const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const players = [
  {
    id: 1,
    name: "LeBron James",
    team: "Lakers",
    position: "Forward",
    points: 27.7,
    rebounds: 8.8,
    assists: 7.8,
    steals: 1.6,
    blocks: 0.8,
    fieldGoalPercentage: 50.6
  },
  {
    id: 2,
    name: "Giannis Antetokounmpo",
    team: "Bucks",
    position: "Forward",
    points: 29.5,
    rebounds: 13.5,
    assists: 5.9,
    steals: 1.1,
    blocks: 1.2,
    fieldGoalPercentage: 55.3
  },
  {
    id: 3,
    name: "Kevin Durant",
    team: "Thunder",
    position: "Forward",
    points: 32.0,
    rebounds: 5.5,
    assists: 5.5,
    steals: 1.3,
    blocks: 0.7,
    fieldGoalPercentage: 50.3
  }
];

let nextId = 4;

app.get("/", function(req, res) {
  res.send("Welcome to the backend");
});

app.get("/about", function(req, res) {
  res.send("This is a page for basketball stats");
});

app.get("/players/stats", function(req, res) {
  res.json(players);
});

app.get("/players/stats/:id", function(req, res) {
  const playerId = Number(req.params.id);

  const player = players.find(function(player) {
    return player.id === playerId;
  });

  if (player === undefined) {
    return res.status(404).json({
      message: "Player not found"
    });
  }

  res.json(player);
});

app.get("/players/top-scorer", function(req, res) {
  let topScorer = players[0];

  for (let i = 0; i < players.length; i++) {
    if (players[i].points > topScorer.points) {
      topScorer = players[i];
    }
  }

  res.json(topScorer);
});

app.get("/players/team/:team", function(req, res) {
  const teamName = req.params.team;

  const matchingPlayers = players.filter(function(player) {
    return player.team.toLowerCase() === teamName.toLowerCase();
  });

  if (matchingPlayers.length === 0) {
    return res.status(404).json({
      message: "No players found for that team"
    });
  }

  res.json(matchingPlayers);
});

app.listen(3000, function() {
  console.log("Server is running on http://localhost:3000");
});

app.post("/players/stats", function(req, res) {
  if (!req.body.name || !req.body.team || !req.body.position) {
    return res.status(400).json({
     message: "Name, team, and position are required"
    });
  }
  const newPlayer = {
    id: nextId,
    name: req.body.name,
    team: req.body.team,
    position: req.body.position,
    points: req.body.points,
    rebounds: req.body.rebounds,
    assists: req.body.assists,
    steals: req.body.steals,
    blocks: req.body.blocks,
    fieldGoalPercentage: req.body.fieldGoalPercentage
  };
  players.push(newPlayer);

  res.status(201).json(newPlayer);

});

app.put("/players/stats/:id", function(req, res) {
  const playerId = Number(req.params.id);

  const player = players.find(function(player) {
    return player.id === playerId;
  });

  if (player == undefined) {
      return res.status(404).json({
      message: "Player not found"
    });
  }
  player.name = req.body.name;
  player.team = req.body.team;
  player.position = req.body.position;
  player.points = req.body.points;
  player.rebounds = req.body.rebounds;
  player.assists = req.body.assists;
  player.steals = req.body.steals;
  player.blocks = req.body.blocks;
  player.fieldGoalPercentage = req.body.fieldGoalPercentage;

  res.json(player);

});

app.delete("/players/stats/:id", function(req, res) {
  const playerId = Number(req.params.id);

  const playerIndex = players.findIndex(function(player) {
    return player.id === playerId;
  });

  if (playerIndex === -1) {
    return res.status(404).json({
      message: "Player not found"
    });
  }

  const deletedPlayer = players.splice(playerIndex, 1);

  res.json(deletedPlayer[0]);
});
