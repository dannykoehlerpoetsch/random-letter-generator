const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Initialisiere das Array der verfügbaren Buchstaben
let availableLetters = alphabet.map((letter) => " " + letter);
let countdownInterval;
let countdownTime = 60;
let useCountdown = false;
const startSound = document.getElementById("startSound");
const endSound = document.getElementById("endSound");

// Initialisiere den Wrapper
const wrapper = document.querySelector(".wrapper");

// Fülle den initialen HTML-Inhalt
document.getElementById("output").innerHTML = `
  <h2>verbleibende Buchstaben: <span class="counter">${availableLetters.length}</span></h2>
  <span id="display"></span>
  <div id="mainCountdown"></div>
`;

// Event-Delegation für den Wrapper
wrapper.addEventListener("click", (event) => {
  const target = event.target;

  if (target.id === "randomLetter") {
    if (availableLetters.length === 0) {
      document.getElementById("output").innerText =
        "Keine Buchstaben mehr verfügbar. Bitte neue Runde starten!";
      return;
    }

    // Starte den 3-Sekunden-Vor-Countdown
    let preCountdownTime = 3;
    document.getElementById("display").innerText = `${preCountdownTime}`;
    document.getElementById("display").style.color = "white";
    document.getElementById("display").style.backgroundColor = "red";

    const preCountdownInterval = setInterval(() => {
      preCountdownTime--;
      document.getElementById("display").innerText = `${preCountdownTime}`;
      if (preCountdownTime <= 0) {
        clearInterval(preCountdownInterval);

        document.getElementById("display").innerText = "";

        // Zeige den zufälligen Buchstaben an
        const randomIndex = Math.floor(Math.random() * availableLetters.length);
        const randomLetter = availableLetters.splice(randomIndex, 1)[0];

        document.getElementById("output").innerHTML = `
          <h2>verbleibende Buchstaben: <span class="counter">${availableLetters.length}</span></h2>
          <span id="display">${randomLetter}</span>
          <div id="preCountdown"></div>
          <div id="mainCountdown"></div>
        `;

        if (useCountdown) {
          startSound.play();
          // Starte den Haupt-Countdown
          clearInterval(countdownInterval);
          let timeLeft = countdownTime;
          document.getElementById(
            "mainCountdown"
          ).innerText = `Zeit: ${timeLeft} Sekunden`;

          countdownInterval = setInterval(() => {
            timeLeft--;
            document.getElementById(
              "mainCountdown"
            ).innerText = `Zeit: ${timeLeft} Sekunden`;
            if (timeLeft <= 0) {
              clearInterval(countdownInterval);
              document.getElementById("mainCountdown").innerText =
                "Zeit abgelaufen!";
              endSound.play();
              document.getElementById("display").style.backgroundColor = "red";
            }
          }, 1000);
        }
      }
    }, 1000);
  } else if (target.id === "newRound") {
    availableLetters = alphabet.map((letter) => " " + letter);
    document.getElementById("output").innerHTML = `
      <h2>verbleibende Buchstaben: <span class="counter">${availableLetters.length}</span></h2>
      <span id="display"></span>
      <div id="mainCountdown"></div>
    `;
    clearInterval(countdownInterval);
  } else if (target.id === "stopCountdown") {
    clearInterval(countdownInterval);
    endSound.play();
    document.getElementById("mainCountdown").innerText = "Countdown gestoppt!";
    document.getElementById("display").style.backgroundColor = "red";
  } else if (target.id === "help") {
    if (target.textContent === "?") {
      target.textContent = "X";
      target.style.backgroundColor = "red";
      document.getElementById("output").innerHTML = `
        <h2>Hilfe:</h2>
        <p>Diese Anwendung hilft dir, "Stadt-Name-Land" zu spielen! 
        </br>
        - Klicke auf "neuer Buchstabe", um einen zufälligen Buchstaben anzuzeigen.</br>
        - Wurde ein Buchstabe einmal gewählt, steht er in dieser Runde nicht mehr zur Verfügung.</br>
        - Du kannst eine neue Runde starten, indem du auf "neue Runde" klickst.</br>
        - Du kannst den Countdown ein- oder ausschalten und die Dauer des Countdowns anpassen.</br>
        - 60 Sekunden sind voreingestellt </br>
        - spielst du mit Countdown, wird dir Start und Ende eines Durchgangs über einen Hinweiston mitgeteilt
        </p>`;
      document.getElementById("output").style.textShadow = "none";
      document.getElementById("output").style.color = "white";
      document.getElementById("output").style.textAlign = "left";
      document.getElementById("output").style.height = "100vh";
    } else {
      target.textContent = "?";
      target.style.backgroundColor = "lime";
      document.getElementById("output").innerHTML = `
      <h2>verbleibende Buchstaben: <span class="counter">${availableLetters.length}</span></h2>
      <span id="display"></span>
      <div id="mainCountdown"></div>`;
      document.getElementById("output").style.height = "auto";
    }
  } else if (target.id === "settings") {
    if (target.textContent === "🛠") {
      target.style.backgroundColor = "red";
      target.textContent = "X";
      document.getElementById("checkbox").style.display = "flex";
    } else {
      target.textContent = "🛠";
      document.getElementById("checkbox").style.display = "none";
      target.style.backgroundColor = "lime";
    }
  }
});

// Event-Delegation für die Checkbox und das Eingabefeld
wrapper.addEventListener("change", (event) => {
  if (event.target.id === "enableCountdown") {
    useCountdown = event.target.checked;
  }
});

wrapper.addEventListener("input", (event) => {
  if (event.target.id === "countdownTime") {
    const userInput = parseInt(event.target.value, 10);
    if (!isNaN(userInput) && userInput > 0) {
      countdownTime = userInput;
    }
  }
});
