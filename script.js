let players = [];
let spy = "";
let location = "";
let time = 300;
let timerInterval;

// голосование
let votes = {};
let votedCount = 0;

/* ===== ДОБАВЛЕНИЕ ИГРОКОВ ===== */

function addPlayer() {
    const input = document.getElementById("playerName");
    const name = input.value.trim();

    if (!name) return;

    if (players.includes(name)) {
        alert("Этот игрок уже добавлен");
        return;
    }

    if (players.length >= 10) {
        alert("Максимум 10 игроков");
        return;
    }

    players.push(name);
    input.value = "";
    updatePlayers();
}

function updatePlayers() {
    document.getElementById("players").innerHTML =
        "<h3>Игроки:</h3>" + players.join("<br>");
}

/* ===== СТАРТ ИГРЫ ===== */

function startGame() {
    if (players.length < 3) {
        alert("Нужно минимум 3 игрока!");
        return;
    }

    spy = players[Math.floor(Math.random() * players.length)];

    const category = randomKey(locations);
    location = locations[category][
        Math.floor(Math.random() * locations[category].length)
    ];

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    if (confirm("Ты шпион? (нажимай ДА только если ты шпион)")) {
        document.getElementById("role").innerText = "🕵️ Ты ШПИОН";
        document.getElementById("location").innerText = "Локация неизвестна";
    } else {
        document.getElementById("role").innerText = "🙂 Ты игрок";
        document.getElementById("location").innerText = "📍 Локация: " + location;
    }

    startTimer();
}

/* ===== ТАЙМЕР ===== */

function startTimer() {
    timerInterval = setInterval(() => {
        time--;
        document.getElementById("timer").innerText =
            "⏱ Осталось времени: " + time + " сек";

        if (time <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Время вышло! Переходим к голосованию.");
            startVoting();
        }
    }, 1000);
}

/* ===== ГОЛОСОВАНИЕ ===== */

function startVoting() {
    document.getElementById("voting").classList.remove("hidden");

    const select = document.getElementById("voteSelect");
    select.innerHTML = "";

    players.forEach(player => {
        const option = document.createElement("option");
        option.value = player;
        option.text = player;
        select.appendChild(option);
    });

    document.getElementById("voteStatus").innerText =
        "Голосов: 0 / " + players.length;
}

function submitVote() {
    const selected = document.getElementById("voteSelect").value;

    if (!selected) return;

    votes[selected] = (votes[selected] || 0) + 1;
    votedCount++;

    document.getElementById("voteStatus").innerText =
        "Голосов: " + votedCount + " / " + players.length;

    if (votedCount === players.length) {
        finishVoting();
    }
}

function finishVoting() {
    let maxVotes = 0;
    let accused = "";

    for (let player in votes) {
        if (votes[player] > maxVotes) {
            maxVotes = votes[player];
            accused = player;
        }
    }

    if (accused === spy) {
        alert("🎉 Шпион найден!\nПобеда мирных игроков!");
    } else {
        alert("❌ Это не шпион!\n🕵️ Шпион победил!");
    }

    resetGame();
}

/* ===== СБРОС ИГРЫ ===== */

function resetGame() {
    clearInterval(timerInterval);
    players = [];
    votes = {};
    votedCount = 0;
    time = 300;

    document.getElementById("menu").classList.remove("hidden");
    document.getElementById("game").classList.add("hidden");
    document.getElementById("voting").classList.add("hidden");
    document.getElementById("players").innerHTML = "";
    document.getElementById("timer").innerText = "";
}

/* ===== ВСПОМОГАТЕЛЬНОЕ ===== */

function randomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
}
