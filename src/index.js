import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Game from './components/Game';



const StarMatch = () => {
  const [gameId, setGameId] = useState(1);
  return <Game key={gameId} startNewGame={()=> setGameId(gameId + 1)}/>
}




const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <React.StrictMode> </React.StrictMode>
//   <>
//   <StarMatch />
//   </>

// );
root.render(<StarMatch />, root);

