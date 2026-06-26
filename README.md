# Basketball Stats Tracker

A simple full-stack basketball stats tracker built with HTML, CSS, JavaScript, Node.js, and Express.

This project lets users view, add, edit, delete, and search basketball players and their stats. The frontend communicates with a backend REST API using `fetch`.

## Features

* View a list of basketball players
* Add a new player
* Edit player information
* Delete a player
* Search players by name or team
* Track stats such as:

  * Points
  * Rebounds
  * Assists
  * Steals
  * Blocks
  * Field goal percentage

## Tech Stack

### Frontend

* HTML
* CSS
* JavaScript

### Backend

* Node.js
* Express
* CORS

## Project Structure

```text
basketball-stats-tracker/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── .gitignore
└── README.md
```

## How to Run the Project

### 1. Start the backend

```bash
cd backend
node server.js
```

The backend should run on:

```text
http://localhost:3000
```

### 2. Open the frontend

Open the frontend file in your browser:

```bash
open frontend/index.html
```

Or manually open `index.html` from the `frontend` folder.

## API Routes

### Get all players

```http
GET /players/stats
```

Returns all players.

### Get one player by ID

```http
GET /players/stats/:id
```

Returns one player based on their ID.

### Add a player

```http
POST /players/stats
```

Creates a new player.

### Update a player

```http
PUT /players/stats/:id
```

Updates an existing player.

### Delete a player

```http
DELETE /players/stats/:id
```

Deletes a player.

### Get the top scorer

```http
GET /players/top-scorer
```

Returns the player with the highest points average.

### Get players by team

```http
GET /players/team/:team
```

Returns players from a specific team.

## What I Learned

While building this project, I practiced:

* Creating an Express server
* Building REST API routes
* Using route parameters with `req.params`
* Sending and receiving JSON
* Using `fetch` to connect frontend and backend
* DOM manipulation with JavaScript
* Form validation
* Working with arrays using `.find()`, `.filter()`, `.map()`, and `.splice()`
* Using Git and GitHub for version control

## Future Improvements

* Save players to a database instead of an in-memory array
* Add better form validation
* Improve the edit form
* Add sorting by points, rebounds, or assists
* Add team filters
* Deploy the project online
