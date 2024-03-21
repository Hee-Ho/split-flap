import React, {useState, useEffect} from "react";
import SplitFlapDisplay from 'react-split-flap-display';
import { CHARACTER } from "../constant";
import "./board.styles.css"

const Board = ({values, rows, length, delay}) => {
  console.log(values.length);
  let minutes = 60 * delay * 1000;
  const [messageValue, setMessageValue] = useState(0);
  const [message, setMessage] = useState([""]);
  
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
    let className = 'row' + i;
    let m = message[i];
    if (message[i] !== undefined) {
      if (message[i].length > length) { //check if length of line fits
        m = message[i].slice(0, length);
      }
      displayRows.push(<SplitFlapDisplay key={i} className = {className} characterSet={CHARACTER} padDirection="right" minLength={length} value= {m.toUpperCase()} fontSize="54px" 
      characterWidth="3rem" withSound={true} borderWidth="2.5px" borderColor="#111" step={100}/>);
    } else {
      displayRows.push(<SplitFlapDisplay key={i} className = {className} characterSet={CHARACTER} padDirection="right" minLength={length} value= {" "} fontSize="54px" 
      characterWidth="3rem" withSound={true} borderWidth="2.5px" borderColor="#111" step={100}/>);
    }
  }
  
  return (
    <div className="board"> 
      {displayRows}
    </div>  
  )
}
export default Board;