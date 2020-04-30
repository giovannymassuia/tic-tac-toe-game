import React, { useState, useCallback, useEffect } from 'react';
// import Timer from 'react-compound-timer';

import socketio from 'socket.io-client';

import Field from '../../components/Field';

import checkResults from '../../services/checkResultsService';

import {
  Container,
  GameScore,
  GameContainer,
  GameArea,
  GameOverContainer,
  GameLoading,
} from './styles';

const SERVER = process.env.URL_SERVER || 'http://192.168.0.15:3001';

console.log('process.env.URL_SERVER: ' + process.env.URL_SERVER);

const Game = () => {
  const [socket, setSocket] = useState();

  const [loading, setLoading] = useState(true);
  const [loadingMensage, setLoadingMensage] = useState('Connecting...');

  const [waiting, setWaiting] = useState(true);
  const [waitingMessage, setWaitingMessage] = useState('');

  const [player, setPlayer] = useState('');
  const [fields, setFields] = useState({});
  const [result, setResult] = useState({
    gameOver: false,
    winner: '',
    crossLineWinner: '',
  });

  const resetGame = useCallback((message) => {
    setLoadingMensage(message);
    setLoading(true);
    setWaiting(true);
    setWaitingMessage('');

    setFields({});
    setResult({
      gameOver: false,
      winner: '',
      crossLineWinner: '',
    });
  }, []);

  const timesUp = useCallback(() => {
    socket.emit('disconnect');
  }, [socket]);

  useEffect(() => {
    const socketConnection = socketio.connect(SERVER);

    socketConnection.on('connect', () => {
      localStorage.setItem('@tictactoe:connectionId', socketConnection.id);
      setSocket(socketConnection);
      setLoadingMensage('Looking for Players...');
    });

    socketConnection.on('disconnect', () => {
      resetGame('Connection has been lost... Reload the page.');
    });

    socketConnection.on('playerMatched', (data) => {
      setPlayer(data.player);
      setLoading(false);
      setWaitingMessage('');

      if (data.player === 'x') {
        setWaiting(false);
      } else {
        setWaitingMessage('Waiting...');
      }
    });

    socketConnection.on('gameReseted', (data) => {
      resetGame(`${data.message} Looking for a new player...`);
    });

    socketConnection.on('updateFields', (data) => {
      setFields(data);
      setWaiting(false);
      setWaitingMessage('');

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
      }

      setWaiting(true);
      setWaitingMessage('Waiting...');
      socket.emit('move', newFields);
    },
    [fields, result.gameOver, socket],
  );

  useEffect(() => {
    if (result.gameOver && result.winner) {
      setWaiting(true);
      setWaitingMessage(`Player ${result.winner.toUpperCase()} wins!`);
    }
  }, [result]);

  return (
    <Container>
      {!loading && (
        <GameScore>
          <span>You: {player.toUpperCase()}</span>
          {waiting && <span>{waitingMessage}</span>}
          {/* <span>
            <Timer
              initialTime={30000}
              direction="backward"
              startImmediately={waiting}
              lastUnit="s"
              checkpoints={[{ time: 0, callback: () => timesUp() }]}
            >
              <Timer.Seconds />.
              <Timer.Milliseconds />
            </Timer>
          </span> */}
        </GameScore>
      )}
      <GameContainer>
        {loading && (
          <GameLoading>
            <div>
              <span>{loadingMensage}</span>
            </div>
          </GameLoading>
        )}
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
