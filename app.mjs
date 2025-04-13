console.log("APP");

import { get } from 'http';
import Game from './models/Game.mjs';
import fs from 'fs';


const filePath = './games.json';

const gameArray = getAllGamesFromLocalStorage(); 
console.log(gameArray); 

function saveGame(gameData) {
    try {
        let storedGames = [];
        if (fs.existsSync(filePath)) {
            storedGames = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        const game = new Game(
            gameData.title,
            gameData.designer,
            gameData.artist,
            gameData.publisher,
            gameData.year,
            gameData.players,
            gameData.time,
            gameData.difficulty,
            gameData.url,
            gameData.playCount,
            gameData.personalRating
        );
        storedGames.push(game);
        fs.writeFileSync(filePath, JSON.stringify(storedGames, null, 2));
        console.log("Game saved successfully!");
    } catch (error) {
        console.error("Failed to save game:", error);
    }
}

function saveGameToLocalStorage(gameData) {
    try {
        let storedGames = JSON.parse(localStorage.getItem('games')) || [];
        storedGames.push(gameData);
        localStorage.setItem('games', JSON.stringify(storedGames));
        console.log("Game saved to localStorage successfully!");
    } catch (error) {
        console.error("Failed to save game to localStorage:", error);
    }
}

function getAllGamesFromLocalStorage() {
    try {
        const storedGames = JSON.parse(localStorage.getItem('games')) || [];
        console.log("Retrieved games from localStorage:", storedGames);
        return storedGames;
    } catch (error) {
        console.error("Failed to retrieve games from localStorage:", error);
        return [];
    }
}

function getAllGamesAsJSON() {
    try {
        const storedGames = JSON.parse(localStorage.getItem('games')) || [];
        const gamesJSON = JSON.stringify(storedGames, null, 2); // Pretty-print JSON
        console.log("All games as JSON:", gamesJSON);
        return gamesJSON;
    } catch (error) {
        console.error("Failed to retrieve or convert games to JSON:", error);
        return "[]"; // Return an empty JSON array as a fallback
    }
}
const gamesJSON = getAllGamesAsJSON();
console.log(gamesJSON); 


function importGamesFromJSON(filePath) {
    try {
        // Read the JSON file
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const games = JSON.parse(fileContent);

        // Save each game as an individual key/value pair in localStorage
        games.forEach((game, index) => {
            const uniqueKey = `game_${index + 1}`; // Generate a unique key for each game
            localStorage.setItem(uniqueKey, JSON.stringify(game));
        });

        console.log("Games imported and saved to localStorage as individual key/value pairs successfully!");
    } catch (error) {
        console.error("Failed to import games from JSON:", error);
    }
} 

const fileInput = document.getElementById("file-input");
const fileContentDisplay = document.getElementById("file-content");
const messageDisplay = document.getElementById("message");

fileInput.addEventListener("change", handleFileSelection);

function handleFileSelection(event) {
  const file = event.target.files[0];
  fileContentDisplay.textContent = ""; // Clear previous file content
  messageDisplay.textContent = ""; // Clear previous messages

  // Validate file existence and type
  if (!file) {
    showMessage("No file selected. Please choose a file.", "error");
    return;
  }

  if (!file.type.startsWith("text")) {
    showMessage("Unsupported file type. Please select a text file.", "error");
    return;
  }

  // Read the file
  const reader = new FileReader();
  reader.onload = () => {
    fileContentDisplay.textContent = reader.result;
  };
  reader.onerror = () => {
    showMessage("Error reading the file. Please try again.", "error");
  };
  reader.readAsText(file);
}

// Displays a message to the user
function showMessage(message, type) {
  messageDisplay.textContent = message;
  messageDisplay.style.color = type === "error" ? "red" : "green";
}



