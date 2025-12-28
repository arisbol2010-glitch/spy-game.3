let players = [];
let spy = "";
let location = "";
let time = 300;
let timerInterval;

function addPlayer() {
    const name = document.getElementById("playerName").value;
    if (name && !players.includes(name)) {
        players.push(name);
        updatePlayers();
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

    const category = randomKey(locations);
    location = locations[category][
        Math.floor(Math.random() * locations[category].length)
    ];

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    if (confirm("Ты шпион?")) {
        document.getElementById("role").innerText = "🕵️ Ты ШПИОН";
        document.getElementById("location").innerText = "Локация неизвестна";
    } else {
        document.getElementById("role").innerText = "🙂 Ты игрок";
        document.getElementById("location").innerText = "📍 " + location;
    }

    startTimer();
}

function startTimer() {
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
    if (voted === spy) {
        alert("🎉 Шпион найден!");
    } else {
        alert("❌ Это не шпион!");
    }
}

function randomKey(obj) {
    return Object.keys(obj)[
        Math.floor(Math.random() * Object.keys(obj).length)
    ];
}