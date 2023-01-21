import React from "react";

const PlayAgain = props => (
    <div className='game-done'> 
      <div className='message'
      style={{color: props.playStatus === 'lost'? 'red': 'green'}}
      >{props.playStatus === 'lost' ? 'Game Over': 'Nice!'}</div>
      <button onClick={props.resetGame}>Play Again!</button>
    </div>
  );

export default PlayAgain;