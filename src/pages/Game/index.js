import React, { useState, useCallback, useEffect } from 'react';

import socketio from 'socket.io-client';

import Field from '../../components/Field';

import checkResults from '../../services/checkResultsService';

import {
  Container,
  GameContainer,
  GameArea,
  GameOverContainer,
} from './styles';

// const SERVER = 'http://192.168.0.15:3001';
const SERVER = 'https://tic-tac-toe-serv.herokuapp.com';

const socket = socketio.connect(SERVER);

socket.on('connect', () => {
  localStorage.setItem('@tictactoe:connectionId', socket.id);
  console.log(`socketId: ${socket.id}`);
});

const Game = () => {
  const [player, setPlayer] = useState('x');
  const [waiting, setWaiting] = useState(true);
  const [fields, setFields] = useState({
    topLeft: '',
    topCenter: '',
    topRight: '',

    centerLeft: '',
    centerCenter: '',
    centerRight: '',

    bottomLeft: '',
    bottomCenter: '',
    bottomRight: '',
  });
  const [result, setResult] = useState({
    gameOver: false,
    winner: '',
    crossLineWinner: '',
  });

  useEffect(() => {
    socket.on('playerMatched', (data) => {
      console.log(data);

      const { playerX, playerY } = data;

      const id = localStorage.getItem('@tictactoe:connectionId');
      if (playerX.id === id) {
        setPlayer(playerX.type);
        setWaiting(false);
      } else {
        setPlayer(playerY.type);
      }
    });

    socket.on('updateFields', (data) => {
      console.log(`updatedData: ${data}`);
      setFields(data);
      setWaiting(false);

      const resultCheck = checkResults(data);
      setResult(resultCheck);
    });
  }, []);

  const handleFieldClick = useCallback(
    (field, value) => {
      const newFields = { ...fields, [field]: value };

      if (!result.gameOver) {
        setFields(newFields);

        const resultCheck = checkResults(newFields);
        setResult(resultCheck);

        // if (player === 'x') setPlayer('o');
        // if (player === 'o') setPlayer('x');
      }

      setWaiting(true);
      socket.emit('played', newFields);
      console.log(socket);
    },
    [fields, player, result.gameOver],
  );

  useEffect(() => {
    if (result.gameOver && result.winner) {
      // alert(`Player ${result.winner} wins!`);
      console.log(`Player ${result.winner} wins!`);
    }
  }, [result]);

  return (
    <Container>
      <GameContainer>
        <GameOverContainer className={result.gameOver && 'showGameOver'}>
          <div className={result.crossLineWinner} />
        </GameOverContainer>
        <GameArea>
          <div className="square square__top-left">
            <Field
              value={fields.topLeft}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('topLeft', player)}
            />
          </div>
          <div className="square square__top-center">
            <Field
              value={fields.topCenter}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('topCenter', player)}
            />
          </div>
          <div className="square square__top-right">
            <Field
              value={fields.topRight}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('topRight', player)}
            />
          </div>
          <div className="square square__center-left">
            <Field
              value={fields.centerLeft}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('centerLeft', player)}
            />
          </div>
          <div className="square square__center-center">
            <Field
              value={fields.centerCenter}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('centerCenter', player)}
            />
          </div>
          <div className="square square__center-right">
            <Field
              value={fields.centerRight}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('centerRight', player)}
            />
          </div>
          <div className="square square__bottom-left">
            <Field
              value={fields.bottomLeft}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('bottomLeft', player)}
            />
          </div>
          <div className="square square__bottom-center">
            <Field
              value={fields.bottomCenter}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('bottomCenter', player)}
            />
          </div>
          <div className="square square__bottom-right">
            <Field
              value={fields.bottomRight}
              type={player}
              waiting={waiting}
              gameOver={result.gameOver}
              onClick={() => handleFieldClick('bottomRight', player)}
            />
          </div>
        </GameArea>
      </GameContainer>
    </Container>
  );
};

export default Game;
