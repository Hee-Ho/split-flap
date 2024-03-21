import './App.css';
import Board from './components/board/board.component';

function App() {
  const test = [[
    "",
    "this is how you ",
    "",
    "   display a message",
    "",
    "      onto the board"
  ],
   ["the limit is 6 rows",
  "",
  "up to 22 characters long",
  "any excess characters",
  "get ignored",
  "1 2 3 4 5 6 7 8 9 10 11 12"]]
  return (
    <div className="app-container">
      <Board className = "board" values={test} />
    </div>
  );
}

export default App;
