
let energy = 100, hunger = 0, score = 0, level = 1, outfit = 'default', targetColor = '';
const colors = ['red', 'blue', 'green', 'yellow'];
const densikImg = document.getElementById('densik');
const energyEl = document.getElementById('energy');
const hungerEl = document.getElementById('hunger');
const scoreEl = document.getElementById('score');
const levelEl = document.getElementById('level');
const messageEl = document.getElementById('message');
const colorButtons = document.getElementById('colorButtons');
const targetColorEl = document.getElementById('targetColor');
const minigame = document.getElementById('minigame');
const gameMenu = document.getElementById('gameMenu');

setInterval(() => {
  energy = Math.max(0, energy - 1);
  hunger = Math.min(100, hunger + 1);
  updateStats();
}, 5000);

function updateStats() {
  energyEl.textContent = energy;
  hungerEl.textContent = hunger;
  scoreEl.textContent = score;
  level = Math.floor(score / 5) + 1;
  levelEl.textContent = level;
}

function feed() {
  hunger = Math.max(0, hunger - 20);
  messageEl.textContent = 'Mniam! Dziękuję!';
  updateStats();
}

function wash() {
  messageEl.textContent = 'Ale czysto! 🛁';
}

function sleep() {
  energy = Math.min(100, energy + 30);
  messageEl.textContent = 'Chrrr... 😴';
  updateStats();
}

function dance() {
  densikImg.src = 'assets/densik-dance.gif';
  messageEl.textContent = 'Densik tańczy! 💃';
  setTimeout(() => {
    score += 2;
    messageEl.textContent = 'To było super!';
    updateStats();
    setOutfit(outfit);
  }, 3000);
}

function setOutfit(name) {
  if (name === 'greenhat' && level < 3) {
    messageEl.textContent = 'Zielona czapka dostępna od poziomu 3!';
    return;
  }
  outfit = name;
  densikImg.src = `assets/densik-${name}.png`;
}

function openGameMenu() {
  gameMenu.classList.toggle('hidden');
}

function startColorGame() {
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  targetColorEl.textContent = targetColor;
  minigame.classList.remove('hidden');
  gameMenu.classList.add('hidden');
  colorButtons.innerHTML = '';
  colors.forEach(color => {
    const btn = document.createElement('button');
    btn.style.backgroundColor = color;
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.onclick = () => selectColor(color);
    colorButtons.appendChild(btn);
  });
}

function selectColor(color) {
  if (color === targetColor) {
    score++;
    messageEl.textContent = 'Brawo! 🎉';
    startColorGame();
  } else {
    messageEl.textContent = 'Spróbuj jeszcze raz!';
  }
  updateStats();
}

function startMemory() {
  alert('🧠 Gra Memory – wersja w budowie!');
}

function startPuzzle() {
  alert('🧩 Puzzle – wersja w budowie!');
}

// MEMORY GAME - SIMPLE VERSION
function startMemory() {
  minigame.classList.remove('hidden');
  gameMenu.classList.add('hidden');
  messageEl.textContent = '🧠 Memory – znajdź pary!';
  colorButtons.innerHTML = '';

  const items = ['🍎', '🍌', '🍇', '🍊'];
  let cards = [...items, ...items].sort(() => 0.5 - Math.random());
  let first = null;
  let lock = false;

  cards.forEach((item, i) => {
    const btn = document.createElement('button');
    btn.textContent = '❓';
    btn.style.width = '60px';
    btn.style.height = '60px';
    btn.style.fontSize = '24px';
    btn.dataset.item = item;

    btn.onclick = () => {
      if (lock || btn.textContent !== '❓') return;
      btn.textContent = item;
      if (!first) {
        first = btn;
      } else {
        lock = true;
        if (first.dataset.item === btn.dataset.item) {
          score++;
          updateStats();
          setTimeout(() => {
            first.disabled = true;
            btn.disabled = true;
            lock = false;
            first = null;
          }, 500);
        } else {
          setTimeout(() => {
            first.textContent = '❓';
            btn.textContent = '❓';
            lock = false;
            first = null;
          }, 1000);
        }
      }
    };
    colorButtons.appendChild(btn);
  });
}

// PUZZLE GAME - SIMPLE VERSION
function startPuzzle() {
  minigame.classList.remove('hidden');
  gameMenu.classList.add('hidden');
  messageEl.textContent = '🧩 Puzzle – ułóż kolejność!';
  colorButtons.innerHTML = '';

  const sequence = [1, 2, 3, 4].sort(() => 0.5 - Math.random());
  const correct = [1, 2, 3, 4];

  sequence.forEach((num, i) => {
    const btn = document.createElement('button');
    btn.textContent = num;
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.style.fontSize = '20px';

    btn.onclick = () => {
      const current = parseInt(btn.textContent);
      const next = (current % 4) + 1;
      btn.textContent = next;
      checkPuzzle();
    };

    colorButtons.appendChild(btn);
  });

  function checkPuzzle() {
    const nums = [...colorButtons.children].map(b => parseInt(b.textContent));
    if (JSON.stringify(nums) === JSON.stringify(correct)) {
      messageEl.textContent = '🎉 Brawo! Ułożyłeś puzzle!';
      score += 2;
      updateStats();
    }
  }
}

function startDanceGame() {
  minigame.classList.remove('hidden');
  gameMenu.classList.add('hidden');
  messageEl.textContent = '🕺 Klikaj w rytm!';

  colorButtons.innerHTML = '';
  let beatIndex = 0;
  const beats = ['⬆️', '⬇️', '⬅️', '➡️'];
  let currentBeat = beats[Math.floor(Math.random() * beats.length)];

  const beatDisplay = document.createElement('h3');
  beatDisplay.textContent = `➡️ ${currentBeat} ⬅️`;
  beatDisplay.style.fontSize = '24px';
  colorButtons.appendChild(beatDisplay);

  const controls = ['⬆️', '⬇️', '⬅️', '➡️'];
  controls.forEach(dir => {
    const btn = document.createElement('button');
    btn.textContent = dir;
    btn.style.width = '50px';
    btn.style.height = '50px';
    btn.onclick = () => {
      if (dir === currentBeat) {
        score++;
        updateStats();
        messageEl.textContent = '🔥 Dobry rytm!';
      } else {
        messageEl.textContent = '❌ Nie w rytmie!';
      }
      currentBeat = beats[Math.floor(Math.random() * beats.length)];
      beatDisplay.textContent = `➡️ ${currentBeat} ⬅️`;
    };
    colorButtons.appendChild(btn);
  });
}

// CHOREOGRAPHY BUILDER
function startChoreoGame() {
  minigame.classList.remove('hidden');
  gameMenu.classList.add('hidden');
  messageEl.textContent = '💃 Ułóż choreografię!';

  const moves = ['🕺', '💃', '🤸', '🤾'];
  const correct = moves.slice(0, 3);
  let chosen = [];

  colorButtons.innerHTML = '';
  moves.forEach(move => {
    const btn = document.createElement('button');
    btn.textContent = move;
    btn.style.fontSize = '30px';
    btn.style.margin = '5px';
    btn.onclick = () => {
      chosen.push(move);
      if (chosen.length === correct.length) {
        if (JSON.stringify(chosen) === JSON.stringify(correct)) {
          messageEl.textContent = '🌟 Perfekcyjna choreografia!';
          score += 3;
        } else {
          messageEl.textContent = '😅 Spróbuj ponownie!';
        }
        updateStats();
        chosen = [];
      }
    };
    colorButtons.appendChild(btn);
  });
}

// MUSIC QUIZ
function startMusicQuiz() {
  minigame.classList.remove('hidden');
  gameMenu.classList.add('hidden');
  messageEl.textContent = '🎵 Quiz o muzyce!';

  const quiz = [
    { q: 'Jaki instrument ma struny?', a: 'Gitara', o: ['Gitara', 'Flet', 'Bęben'] },
    { q: 'Co gra rytm?', a: 'Perkusja', o: ['Perkusja', 'Flet', 'Pianino'] },
    { q: 'Który z tych to taniec?', a: 'Tango', o: ['Tango', 'Obiad', 'Wiersz'] }
  ];
  const q = quiz[Math.floor(Math.random() * quiz.length)];

  colorButtons.innerHTML = '';
  const question = document.createElement('p');
  question.textContent = q.q;
  colorButtons.appendChild(question);

  q.o.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.onclick = () => {
      if (option === q.a) {
        messageEl.textContent = '🎉 Dobrze!';
        score += 2;
      } else {
        messageEl.textContent = '❌ To nie to!';
      }
      updateStats();
    };
    colorButtons.appendChild(btn);
  });
}

// Dodaj animację po poprawnej odpowiedzi
function animateCorrect(el) {
  el.classList.add("animate-pop");
  setTimeout(() => el.classList.remove("animate-pop"), 300);
}

// Dodaj animację po błędnej odpowiedzi
function animateIncorrect(el) {
  el.classList.add("animate-wiggle");
  setTimeout(() => el.classList.remove("animate-wiggle"), 400);
}

// Nadpisujemy selectColor by dodać animację
function selectColor(color) {
  const buttons = [...colorButtons.children];
  const clicked = buttons.find(b => b.textContent === "" && b.style.backgroundColor === color);

  if (color === targetColor) {
    score++;
    messageEl.textContent = 'Brawo! 🎉';
    if (clicked) animateCorrect(clicked);
    startColorGame();
  } else {
    messageEl.textContent = 'Spróbuj jeszcze raz!';
    if (clicked) animateIncorrect(clicked);
  }
  updateStats();
}

function showConfetti() {
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Konfetti co 10 punktów
function updateStats() {
  energyEl.textContent = energy;
  hungerEl.textContent = hunger;
  scoreEl.textContent = score;
  level = Math.floor(score / 5) + 1;
  levelEl.textContent = level;

  if (score > 0 && score % 10 === 0) {
    showConfetti();
  }
}

// Zapis i odczyt postępu
window.addEventListener("load", () => {
  const saved = JSON.parse(localStorage.getItem("densikSave") || "{}");
  if (saved.name) {
    playerName = saved.name;
    document.getElementById("playerName").textContent = playerName;
    energy = saved.energy || 100;
    hunger = saved.hunger || 0;
    score = saved.score || 0;
    outfit = saved.outfit || "default";
    setOutfit(outfit);
    updateStats();
  } else {
    const name = prompt("Jak masz na imię?");
    playerName = name || "Gracz";
    document.getElementById("playerName").textContent = playerName;
  }
});

function saveGame() {
  const save = {
    name: playerName,
    energy,
    hunger,
    score,
    outfit
  };
  localStorage.setItem("densikSave", JSON.stringify(save));
}

// Losowa pogoda (demo)
function randomWeather() {
  const icons = ['☀️', '🌧️', '⛅', '❄️'];
  const selected = icons[Math.floor(Math.random() * icons.length)];
  document.getElementById("weather").textContent = selected;
}

let playerName = "Gracz";
setInterval(saveGame, 10000);
setInterval(randomWeather, 5000);

function startPuzzle() {
  minigame.classList.remove('hidden');
  gameMenu.classList.add('hidden');
  messageEl.textContent = '🧩 Ułóż puzzle – przesuwanka!';
  colorButtons.innerHTML = '';

  const gridSize = 3;
  const tiles = [];
  let empty = { row: gridSize - 1, col: gridSize - 1 };

  // Tworzymy tablicę w losowej kolejności
  const order = Array.from({ length: gridSize * gridSize - 1 }, (_, i) => i + 1).sort(() => Math.random() - 0.5);
  order.push(null); // ostatni to puste

  for (let i = 0; i < gridSize * gridSize; i++) {
    const tile = document.createElement('div');
    tile.className = 'tile';
    const num = order[i];
    if (num !== null) {
      tile.style.backgroundImage = 'url("assets/densik-party.png")';
      tile.style.backgroundSize = `${gridSize * 100}% ${gridSize * 100}%`;
      tile.style.backgroundPosition = `${(num - 1) % gridSize * 100 / (gridSize - 1)}% ${Math.floor((num - 1) / gridSize) * 100 / (gridSize - 1)}%`;
      tile.dataset.num = num;
      tile.onclick = () => tryMove(i);
    } else {
      tile.dataset.empty = true;
    }
    tiles.push(tile);
    colorButtons.appendChild(tile);
  }

  function tryMove(index) {
    const row = Math.floor(index / gridSize);
    const col = index % gridSize;
    const dx = Math.abs(row - empty.row);
    const dy = Math.abs(col - empty.col);
    if ((dx === 1 && dy === 0) || (dx === 0 && dy === 1)) {
      // Zamień z pustym
      const emptyIndex = empty.row * gridSize + empty.col;
      colorButtons.insertBefore(tiles[index], tiles[emptyIndex]);
      colorButtons.insertBefore(tiles[emptyIndex], tiles[index].nextSibling);
      [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
      empty = { row, col };
      checkSolved();
    }
  }

  function checkSolved() {
    const current = [...colorButtons.children];
    const correct = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1);
    for (let i = 0; i < current.length - 1; i++) {
      if (parseInt(current[i].dataset.num) !== i + 1) return;
    }
    messageEl.textContent = '🎉 Puzzle ułożone!';
    score += 3;
    updateStats();
  }
}
