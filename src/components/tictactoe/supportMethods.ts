export function getCoordinates(stepIndex: number) {
  switch(stepIndex) {
    case 0:
      return '1, 1';
    case 1:
      return '1, 2';
    case 2:
      return '1, 3';
    case 3:
      return '2, 1';
    case 4:
      return '2, 2';
    case 5:
      return '2, 3';
    case 6:
      return '3, 1';
    case 7:
      return '3, 2';
    case 8:
      return '3, 3';
    default:
      return 'undefined, undefined'
  }
}

export function calculateWinner(squares: any[][]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        'winner': squares[a],
        'line': lines[i]
      };
    }
  }
  return null;
}
