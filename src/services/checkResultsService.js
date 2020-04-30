const checkResults = (fields) => {
  let winner;
  let gameOver = false;
  let crossLineWinner;

  // lineTop
  if (
    fields.topLeft &&
    fields.topCenter &&
    fields.topRight &&
    fields.topLeft === fields.topCenter &&
    fields.topCenter === fields.topRight
  ) {
    winner = fields.topLeft;
    gameOver = true;
    crossLineWinner = 'lineTop';
  }
  // lineCenter
  if (
    fields.centerLeft &&
    fields.centerCenter &&
    fields.centerRight &&
    fields.centerLeft === fields.centerCenter &&
    fields.centerCenter === fields.centerRight
  ) {
    winner = fields.centerLeft;
    gameOver = true;
    crossLineWinner = 'lineCenter';
  }

  // lineBottom
  if (
    fields.bottomLeft &&
    fields.bottomCenter &&
    fields.bottomRight &&
    fields.bottomLeft === fields.bottomCenter &&
    fields.bottomCenter === fields.bottomRight
  ) {
    winner = fields.bottomLeft;
    gameOver = true;
    crossLineWinner = 'lineBottom';
  }

  // columnLeft
  if (
    fields.topLeft &&
    fields.centerLeft &&
    fields.bottomLeft &&
    fields.topLeft === fields.centerLeft &&
    fields.centerLeft === fields.bottomLeft
  ) {
    winner = fields.topLeft;
    gameOver = true;
    crossLineWinner = 'columnLeft';
  }

  // columnCenter
  if (
    fields.topCenter &&
    fields.centerCenter &&
    fields.bottomCenter &&
    fields.topCenter === fields.centerCenter &&
    fields.centerCenter === fields.bottomCenter
  ) {
    winner = fields.topCenter;
    gameOver = true;
    crossLineWinner = 'columnCenter';
  }

  // columnRight
  if (
    fields.topRight &&
    fields.centerRight &&
    fields.bottomRight &&
    fields.topRight === fields.centerRight &&
    fields.centerRight === fields.bottomRight
  ) {
    winner = fields.topRight;
    gameOver = true;
    crossLineWinner = 'columnRight';
  }

  // diagonalTopLeftBottomRight
  if (
    fields.topLeft &&
    fields.centerCenter &&
    fields.bottomRight &&
    fields.topLeft === fields.centerCenter &&
    fields.centerCenter === fields.bottomRight
  ) {
    winner = fields.topLeft;
    gameOver = true;
    crossLineWinner = 'diagonalTopLeftBottomRight';
  }

  // diagonalTopRightBottomLeft
  if (
    fields.topRight &&
    fields.centerCenter &&
    fields.bottomLeft &&
    fields.topRight === fields.centerCenter &&
    fields.centerCenter === fields.bottomLeft
  ) {
    winner = fields.topRight;
    gameOver = true;
    crossLineWinner = 'diagonalTopRightBottomLeft';
  }

  return { gameOver, winner, crossLineWinner };
};

export default checkResults;
