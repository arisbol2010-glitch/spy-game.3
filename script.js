// Локации
const locations = ["Казино", "Школа", "Пляж", "Самолет", "Больница", "Отель"];

// Игроки
let players = [];
let playerCount = 0;
let currentIndex = 0;
let spyIndex = 0;
let location = "";

// DOM
const startScreen = document.getElementById("startScreen");
const nameScreen = document.getElementById("nameScreen");
const cardScreen = document.getElementById("cardScreen");
const gameScreen = document.getElementById("gameScreen");

const nameTitle = document.getElementById("nameTitle");
const cardTitle = document.getElementById("cardTitle");
const cardText = document.getElementById("cardText");

const currentPlayerName = document.getElementById("currentPlayerName");
const targetSelect = document.getElementById("targetSelect");
const askBtn = document.getElementById("askBtn");
const guessBtn = document.getElementById("guessBtn");
const playersContainer = document.getElementById("playersContainer");

const sound = document.getElementById("tickSound");

// Запуск игры — ввод количества игроков
function startGame() {
  playerCount = Number(document.getElementById("playerCount").value);
  if (playerCount < 3 || playerCount > 10) {
    alert("Минимум 3 игрока и максимум 10");
    return;
  }
  startScreen.classList.add("hidden");
  nameScreen.classList.remove("hidden");
  currentIndex = 0;
  players = [];
  askName();
}

// Ввод имен игроков
function askName() {
  nameTitle.innerText = `Игрок ${currentIndex + 1}, введите имя`;
  document.getElementById("playerName").value = "";
}

function saveName() {
  const name = document.getElementById("playerName").value.trim();
  if (!name) return;
  players.push({ name });
  currentIndex++;
  if (currentIndex < playerCount) {
    askName();
  } else {
    assignRoles();
  }
}

// Назначение ролей
function assignRoles() {
  spyIndex = Math.floor(Math.random() * playerCount);
  location = locations[Math.floor(Math.random() * locations.length)];
  players.forEach((p, i) => {
    if (i === spyIndex) p.role = "spy";
    else p.role = "civil";
  });
  currentIndex = 0;
  nameScreen.classList.add("hidden");
  showCard();
}

// Показываем карточку игрока
function showCard() {
  cardScreen.classList.remove("hidden");
  const p = players[currentIndex];
  cardTitle.innerText = p.name;
  cardText.innerText = p.role === "spy" ? "🕵️ ВЫ ШПИОН" : "📍 Локация: " + location;
}

// Скрытие карточки и переход к следующему
function hideCard() {
  cardScreen.classList.add("hidden");
  currentIndex++;
  if (currentIndex < playerCount) {
    showCard();
  } else {
    startGameplay();
  }
}

// Начало игрового процесса
let currentPlayer = 0;
let lastAsked = null;
let streak = 0;

function startGameplay() {
  gameScreen.classList.remove("hidden");
  renderPlayers();
  updateCurrentPlayerUI();
}

// Отображение игроков и выбора цели
function renderPlayers() {
  playersContainer.innerHTML = "";
  targetSelect.innerHTML = "";

  players.forEach((p, i) => {
    const div = document.createElement("div");
    div.className = "player";
    div.dataset.id = i;
    div.innerText = p.name;
    if (i === currentPlayer) div.style.fontWeight = "bold";
    playersContainer.appendChild(div);

    if (i !== currentPlayer) {
      const option = document.createElement("option");
      option.value = i;
      option.text = p.name;
      targetSelect.appendChild(option);
    }
  });

  const p = players[currentPlayer];
  guessBtn.style.display = p.role === "spy" ? "inline-block" : "none";
}

// Обновление UI текущего игрока
function updateCurrentPlayerUI() {
  currentPlayerName.innerText = players[currentPlayer].name;
}

// Кнопка "Задать вопрос"
askBtn.addEventListener("click", () => {
  const target = Number(targetSelect.value);
  if (target === lastAsked && streak >= 2) {
    alert("Этому игроку нельзя задавать больше двух вопросов подряд!");
    return;
  }
  streak = target === lastAsked ? streak + 1 : 1;
  lastAsked = target;
  alert(`${players[currentPlayer].name} задает вопрос ${players[target].name}`);
  nextTurn();
});

// Кнопка "Угадать локацию" (для шпиона)
guessBtn.addEventListener("click", () => {
  const guess = prompt("Введите локацию:");
  if (!guess) return;
  if (guess.toLowerCase() === location.toLowerCase()) {
    alert("Шпион победил!");
  } else {
    alert("Неверно! Игра продолжается.");
    nextTurn();
  }
});

// Переход к следующему игроку
function nextTurn() {
  currentPlayer = (currentPlayer + 1) % players.length;
  renderPlayers();
  updateCurrentPlayerUI();
}