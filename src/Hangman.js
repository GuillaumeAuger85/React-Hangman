import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from './words.js';

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleClick = this.handleClick.bind(this)
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  generateButtons() {
    if (this.state.nWrong < this.props.maxWrong) {
      return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
        <button
          value={ltr}
          onClick={this.handleGuess}
          disabled={this.state.guessed.has(ltr)}
          key={ltr}
        >
          {ltr}
        </button>
      ));
    } else {
      return 'You loose !!!'
    }

  }
  restartGame() {
    this.setState(st => ({
      guessed: new Set(),
      nWrong: 0,
      answer: randomWord()
    }))
  }

  handleClick() {
    this.restartGame()
  }
  render() {
    const isWinner = (this.guessedWord().join("") === this.state.answer)
    const isGameOver = this.state.nWrong >= this.props.maxWrong
    return (
      <div className='Hangman'>
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={`${this.state.nWrong} wrong guesses`} />
        <p className="wrongGuesses">Wrong Guesses: {this.state.nWrong}</p>
        <p className='Hangman-word'>{isGameOver ?  this.state.answer : this.guessedWord() }</p>
        <p className='Hangman-btns'>{isWinner ? 'You Win !!!' : this.generateButtons()}</p>
        <button id='restart' onClick={this.handleClick} >Restart Game</button>
      </div>
    );
  }
}

export default Hangman;
