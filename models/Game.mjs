// models/Game.js

export default class Game {
    constructor({
      title,
      designer,
      artist,
      publisher,
      year,
      players,
      time,
      difficulty,
      url,
      playCount,
      personalRating
    }) {
      this.title = title;
      this.designer = designer;
      this.artist = artist;
      this.publisher = publisher;
      this.year = year;
      this.players = players;
      this.time = time;
      this.difficulty = difficulty;
      this.url = url;
      this.playCount = playCount;
      this.personalRating = personalRating;
    }
  
    static fromJSON(json) {
      return new Game(json);
    }
  
    toJSON() {
      return {
        title: this.title,
        designer: this.designer,
        artist: this.artist,
        publisher: this.publisher,
        year: this.year,
        players: this.players,
        time: this.time,
        difficulty: this.difficulty,
        url: this.url,
        playCount: this.playCount,
        personalRating: this.personalRating
      };
    }
  } 