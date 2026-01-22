const locations = ["Казино", "Школа", "Пляж", "Самолет"];
const location = locations[Math.floor(Math.random() * locations.length)];

const players = [
  { id: 0, name: "Игрок 1", role: "civil" },
  { id: 1, name: "Игрок 2", role: "civil" },
  { id: 2, name: "Игрок 3", role: "civil" },
  { id: 3, name: "Игрок 4", role: "spy" },
];

let currentPlayer = 0;
let lastAsked = null;
let streak = 0;

const playersDiv = document.getElementById("players");
const select = document.getElementById("targetSelect");
const guessBtn = document.getElementById("guessBtn");

function renderPlayers() {
  playersDiv.innerHTML = "";
  select.innerHTML = "";

  const angleStep = 360 / players.length;
  players.forEach((p, i) => {
    const angle = angleStep * i;
    const x = 50 + 40 * Math.cos(angle * Math.PI / 180);
    const y = 50 + 40 * Math.sin(angle * Math.PI / 180);

    const div = document.createElement("div");
    div.className = "player";
    div.dataset.id = p.id;
    div.style.left = x + "%";
    div.style.top = y + "%";
    div.innerText = p.name;
    playersDiv.appendChild(div);

    if (p.id !== currentPlayer) {
      const option = document.createElement("option");
      option.value = p.id;
      option.text = p.name;
      select.appendChild(option);
    }
  });

  highlight();
}

function highlight() {
  document.querySelectorAll(".player").forEach(p => {
    p.classList.remove("active");
  });
  document.querySelector(`[data-id="${currentPlayer}"]`).classList.add("active");

  guessBtn.style.display =
    players[currentPlayer].role === "spy" ? "block" : "none";
}

function ask() {
  const target = Number(select.value);

  if (target === lastAsked && streak >= 2) {
    alert("Этому игроку нельзя задавать больше двух вопросов подряд!");
    return;
  }

  streak = target === lastAsked ? streak + 1 : 1;
  lastAsked = target;

  alert(players[currentPlayer].name + " задаёт вопрос " + players[target].name);
  nextTurn();
}

function nextTurn() {
  currentPlayer = (currentPlayer + 1) % players.length;
  renderPlayers();
}

function guessLocation() {
  const guess = prompt("Введите локацию:");
  alert(guess === location ? "Шпион победил!" : "Неверно!");
}

renderPlayers();

// Таймер + звук
let time = 300;
const timerDiv = document.getElementById("timer");
const sound = document.getElementById("tickSound");

setInterval(() => {
  time--;
  timerDiv.innerText = time;
  sound.play();

  if (time <= 0) {
    alert("Время вышло!");
    location.reload();
  }
}, 1000);

// Карточки ролей
players.forEach(p => {
  alert(
    p.name +
    ": " +
    (p.role === "spy" ? "Вы ШПИОН" : "Локация: " + location)
  );
});