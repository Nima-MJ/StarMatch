import React, {useState, useEffect} from "react";
import utils from "../math-utils";
import StarDisplay from './StarDisplay';
import PlayAgain from './PlayAgain';
import PlayNumber from "./PlayNumber";

const useGameState = () => {

    const [stars, setStars] = useState(utils.random(1,9))
    const [availableNums, setAvailibleNums] = useState(utils.range(1,9))
    const [candidateNum, setCandidateNum] = useState([])
    const [secondsLeft, setSecondsLeft] = useState(10);
  
    useEffect(() => {
      if (secondsLeft > 0 && availableNums.length > 0) {
        const timerId = setTimeout(
          () => setSecondsLeft((prevSecondsLeft) => prevSecondsLeft - 1),
          1000
        );
        return () => clearTimeout(timerId);
      }
    }, [secondsLeft, setAvailibleNums]);
  
    const setGameState = (newCandidateNums) => {
      if (utils.sum(newCandidateNums) !== stars){
        setCandidateNum(newCandidateNums)
      }else{
        const newAvailibleNums = availableNums.filter(
          n => !newCandidateNums.includes(n)
        );
        setStars(utils.randomSumIn(newAvailibleNums, 9))
        setAvailibleNums(newAvailibleNums);
        setCandidateNum([]);
      }
    };
    return {stars, availableNums, candidateNum, secondsLeft, setGameState};
  };
  
  const Game = (props) => {
    const {
      stars, 
      availableNums, 
      candidateNum, 
      secondsLeft, 
      setGameState
    }=useGameState();
  
    const candidatesAreWrong = utils.sum(candidateNum) > stars;
    const gameStatus = availableNums.length === 0 
    ? 'won'
    : secondsLeft === 0 ? 'lost' : 'active'
  
    const numberStatus = (number) =>{
      if (!availableNums.includes(number)){
        return 'used';
      }
  
      if(candidateNum.includes(number)){
        return candidatesAreWrong ? 'wrong': 'candidate';
      }
  
      return 'availible'
    };
  
    const onNUmberClick = (number, currentStatus) => {
      //current status => new status 
      if (gameStatus !== 'active' || currentStatus == 'used'){
        return;
      }
  
      const newCandidateNums = 
      currentStatus === 'availible'? candidateNum.concat(number): candidateNum.filter(cn => cn !== number);
      setGameState(newCandidateNums);
    }
  
    return (
      <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {gameStatus !== 'active' ? (
              <PlayAgain resetGame={props.startNewGame} playStatus={gameStatus}/>
            ):(
              <StarDisplay count={stars}/>
            )}
          </div>
          <div className="right">
              {utils.range(1,9).map((num) => 
                <PlayNumber 
                key={num} 
                status={numberStatus(num)}
                onClick={onNUmberClick}
                num={num}/>
              )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
  };

export default Game;