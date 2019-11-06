import React, { Component } from "react";
import {randomWord} from './words'
import "./Hangman.css";
import png0 from "./jpg/0.png";
import png1 from "./jpg/1.png";
import png2 from "./jpg/2.png";
import png3 from "./jpg/3.png";
import png4 from "./jpg/4.png";
import png5 from "./jpg/5.png";
import png6 from "./jpg/6.png";

class Hangman extends Component {
  static defaultProps = {
    chance: 6,
    images: [png0, png1, png2, png3, png4, png5, png6]
  };
  constructor(props) {
    super(props);
    this.state = { wrong: 0, guessed: new Set(), word: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this)
  }
  reset() {
    this.setState({
        wrong:0, guessed: new Set(), word: randomWord()
    })
  }
  presentWord() {
    return this.state.word
      .split("")
      .map(letter => (this.state.guessed.has(letter) ? letter : "_"));
  }
  handleGuess(e) {
    const guessedLetter = e.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(guessedLetter),
      wrong: st.wrong + (st.word.includes(guessedLetter) ? 0 : 1)
    }));
  }
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
    <span className='key' key={letter}>
      <button
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}
      >
        {letter}
      </button>
    </span>
    ));
  }
  render() {
    const inGame = this.props.chance > this.state.wrong;
    const isWinner = this.presentWord().join('') === this.state.word
    const altText = `Have ${this.props.chance - this.state.wrong} life left`;
    let gameState = this.generateButtons()
    if(isWinner) gameState = 'You win!'
    if(!inGame) gameState = `You lose: ${this.state.word}`
    return (
      <div className="Hangman">
        <div className="Container">
          <img src={this.props.images[this.state.wrong]} alt={altText} />
          <p className="Hangman-wrong">Wrong guesses: {this.state.wrong}</p>
        </div>
        <div className="Container">
          <p className="Hangman-word">
            {!inGame ? this.state.word : this.presentWord()}
          </p>
          <p className="Hangman-btns">
            {gameState}
          </p>
          <button onClick={this.reset} className='Hangman-reset'>Reset</button>
        </div>
      </div>
    );
  }
}

export default Hangman;
