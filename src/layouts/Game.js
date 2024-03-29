import React from 'react';
import { connect } from 'react-redux';
import Target from '../components/Target';
import Info from '../components/Info';
import ButtonStart from '../components/ButtonStart';
import ButtonStop from '../components/ButtonStop';
import Lost from '../components/Lost';
import LevelSelector from '../components/LevelSelector';
import { deleteTargetRequested } from '../actions/targets';
import { gameStartRequested, gameStopRequested, changeLevelRequested } from '../actions/game';

const mapStateToProps = state => {
  return {
    lives: state.targets.lives,
    score: state.targets.score,
    isStarted: state.game.isStarted,
    globalTimeoutLevel: state.game.globalTimeoutLevel,
    isLost: state.targets.isLost, 
    targets: state.targets.targets
  }
};

const GameLayout = ({ isStarted, isLost, globalTimeoutLevel, lives, score, targets, dispatch }) => (
  <div
    id="gamecanvas"
    style={{
      position: 'fixed',
      backgroundColor: '#21222C',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: '100vw',
      height: '100vh',
      margin: 'auto'
    }}
  >
    {isStarted ? (!isLost ? (
      <React.Fragment>
        <ButtonStop onClick={() => dispatch(gameStopRequested())}></ButtonStop>
        <Info lives={lives} score={score} />
        {
          targets.map((target, index) => {
            return (
              <Target
                key={index}
                id={index}
                {...target}
                onDeleteTarget={() => dispatch(deleteTargetRequested(target.id, score))}
              />
            );
          })
        }
      </React.Fragment>
    ) : (<Lost restartGame={() => dispatch(gameStopRequested())}/>)) : (
      <React.Fragment>
        <LevelSelector onChangeValue={(event) => dispatch(changeLevelRequested(event.target.value))}/>
        <ButtonStart onClick={() => dispatch(gameStartRequested(globalTimeoutLevel))} />
      </React.Fragment>
    )}
  </div>
);

export default connect(mapStateToProps)(GameLayout);
