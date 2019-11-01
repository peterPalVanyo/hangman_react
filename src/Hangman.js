import React, {Component} from 'react'
import './Hangman.css'
import png0 from './jpg/0.png'
import png1 from './jpg/1.png'
import png2 from './jpg/2.png'
import png3 from './jpg/3.png'
import png4 from './jpg/4.png'
import png5 from './jpg/5.png'
import png6 from './jpg/6.png'

class Hangman extends Component {
    static defaultProps = {
        images:[png0, png1, png2, png3, png4, png5, png6]
    }
    render() {
        return <img src={this.props.images[3]} alt='png0'/>
    }
}

export default Hangman