import React, {useState, useEffect} from "react";
import SplitFlapDisplay from 'react-split-flap-display';
import { CHARACTER } from "../constant";
import "./board.styles.css"

//fontSize and characterWidth value must be relatively similar to display the character correctly
//delay is in minute
const Board = ({values =[""], rows = 6, length = 22, delay = .5, step = 100 ,fontSize = "2.5rem", characterWidth = "2rem"}) => {
  console.log(values.length);
  let minutes = 60 * delay * 1000;
  const [messageValue, setMessageValue] = useState(0);
  const [message, setMessage] = useState(values[messageValue]);
  
  useEffect(() => {
    const updateMessage = () => {
      let value = messageValue + 1;
      if (value === values.length) {
        value = 0;
      }
      setTimeout(() => {
        setMessageValue(value);
        setMessage(values[messageValue]);
      } , minutes);
    };

    updateMessage();
    return () => clearTimeout(updateMessage); //restart timer
  }, [message, messageValue, values, minutes]);

  
  let displayRows = [];
  for (let i = 0; i < rows; i++) {
    let className = 'board-row';
    let m = message[i];
    if (message[i] !== undefined || message.length < 1) {
      if (message[i].length > length) { //check if length of line fits
        m = message[i].slice(0, length);
      }
      displayRows.push(<SplitFlapDisplay key={i} className = {className} characterSet={CHARACTER} padDirection="right" minLength={length} value= {m.toUpperCase()} fontSize= {fontSize} 
      characterWidth={characterWidth} withSound={true} borderWidth=".2rem" borderColor="#111" step={step}/>);
    } else {
      displayRows.push(<SplitFlapDisplay key={i} className = {className} characterSet={CHARACTER} padDirection="right" minLength={length} value= {" "} fontSize={characterWidth} 
      characterWidth={characterWidth} withSound={true} borderWidth=".2rem" borderColor="#111" step={step}/>);
    }
  }
  
  return (
    <div className="board">
      {displayRows}
    </div>
  )
}
export default Board;