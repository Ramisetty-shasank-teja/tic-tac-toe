const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
let currentPlayer = 'X';
let board = Array(9).fill(null);
let gameActive = true;

cells.forEach(cell => {
  cell.addEventListener('click', handleClick);
});

function handleClick(e) {
  const i = e.target.dataset.index;

  if (!gameActive || board[i]) return;

  board[i] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    status.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    launchConfetti();       // 🎊 Center splash
    showPopperBurst();      // 🎉 Birthday poppers
  } else if (board.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
}

function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern =>
    pattern.every(index => board[index] === player)
  );
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = "Player X's turn";
  cells.forEach(cell => cell.textContent = '');
  document.getElementById('confetti-wrapper').innerHTML = '';
  document.getElementById('popper-container').innerHTML = '';
}

// 🎇 Confetti burst from center
function launchConfetti() {
  const wrapper = document.getElementById('confetti-wrapper');

  for (let i = 0; i < 60; i++) {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');

    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 150 + 50;

    const x = Math.cos(angle) * radius + 'px';
    const y = Math.sin(angle) * radius + 'px';

    confetti.style.setProperty('--x', x);
    confetti.style.setProperty('--y', y);
    confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 70%)`;

    wrapper.appendChild(confetti);

    setTimeout(() => confetti.remove(), 1000);
  }
}

// 🎉 Birthday poppers from center
function showPopperBurst() {
  const popperContainer = document.getElementById('popper-container');
  const emojis = ['🎉', '🎊', '🎂', '🎈', '✨', '🥳', '🍭', '🎁'];

  for (let i = 0; i < 8; i++) {
    const popper = document.createElement('div');
    popper.classList.add('popper');
    popper.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    popper.style.setProperty('--x', Math.floor(Math.random() * 100 - 50));
    popper.style.setProperty('--y', Math.floor(Math.random() * 100 - 50));

    popperContainer.appendChild(popper);
    setTimeout(() => popper.remove(), 1000);
  }
}
