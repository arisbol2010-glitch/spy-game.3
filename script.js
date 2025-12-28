let players = [];
let spy = "";
let gameLocation = "";
let time = 300;
let timerInterval;

function addPlayer() {
    const input = document.getElementById("playerName");
    const name = input.value.trim();

    if (!name) return;

    if (!players.includes(name)) {
        players.push(name);
        updatePlayers();
        input.value = "";
    }
}

function updatePlayers() {
    document.getElementById("players").innerHTML =
        "<h3>Игроки:</h3>" + players.join("<br>");
}

function startGame() {
    if (players.length < 3) {
        alert("Минимум 3 игрока!");
        return;
    }

    spy = players[Math.floor(Math.random() * players.length)];

    const categories = Object.keys(locations);
    const category = categories[Math.floor(Math.random() * categories.length)];

    gameLocation = locations[category][
        Math.floor(Math.random() * locations[category].length)
    ];

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    const isSpy = confirm("Ты шпион?");

    if (isSpy) {
        document.getElementById("role").innerText = "🕵️ Ты ШПИОН";
        document.getElementById("location").innerText = "Локация неизвестна";
    } else {
        document.getElementById("role").innerText = "🙂 Ты игрок";
        document.getElementById("location").innerText = "📍 " + gameLocation;
    }

    startTimer();
}

function startTimer() {
    time = 300;

    timerInterval = setInterval(() => {
        time--;
        document.getElementById("timer").innerText =
            "⏱ Осталось: " + time + " сек";

        if (time <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Время вышло!");
        }
    }, 1000);
}

function vote() {
    const voted = prompt("Кого вы считаете шпионом?");
    if (!voted) return;

    if (voted === spy) {
        alert("🎉 Шпион найден!");
    } else {
        alert("❌ Это не шпион!");
    }
}
