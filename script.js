const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

// Initialisiere das Array der verfügbaren Buchstaben
let availableLetters = alphabet.map((letter) => " " + letter);
let countdownInterval;
let countdownTime = 60;
let useCountdown = false;
const startSound = document.getElementById("startSound");
const endSound = document.getElementById("endSound");

document.getElementById("output").innerHTML = `
<h2>verbleibende Buchstaben: <span class="counter">${availableLetters.length}</span></h2>
<span id="display"></span>

<div id="mainCountdown"></div>
`;

// Event Listener für den Zufallsbuchstaben-Button
document.getElementById("randomLetter").addEventListener("click", () => {
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
      startSound.play();
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
});

// Event Listener für den neuen Runden-Button
document.getElementById("newRound").addEventListener("click", () => {
  availableLetters = alphabet.map((letter) => " " + letter);
  document.getElementById("output").innerHTML = `
    <h2>verbleibende Buchstaben: <span class="counter">${availableLetters.length}</span></h2>
    <span id="display"></span>
    <div id="mainCountdown"></div>
  `;
  clearInterval(countdownInterval);
});

// Event Listener für die Countdown-Checkbox
document
  .getElementById("enableCountdown")
  .addEventListener("change", (event) => {
    useCountdown = event.target.checked;
  });

// Event Listener für das Countdown-Zeit-Eingabefeld
document.getElementById("countdownTime").addEventListener("input", (event) => {
  const userInput = parseInt(event.target.value, 10);
  if (!isNaN(userInput) && userInput > 0) {
    countdownTime = userInput;
  }
});

// Event Listener für den Countdown-Stop-Button
document.getElementById("stopCountdown").addEventListener("click", () => {
  clearInterval(countdownInterval);
  endSound.play();
  document.getElementById("mainCountdown").innerText = "Countdown gestoppt!";
  document.getElementById("display").style.backgroundColor = "red";
});

// Event Listener für den Hilfe-Button
const helpButton = document.getElementById("help");
const outputDiv = document.getElementById("output");

helpButton.addEventListener("click", () => {
  if (helpButton.textContent === "?") {
    helpButton.textContent = "X";
    helpButton.style.backgroundColor = "red";
    outputDiv.innerHTML = `
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
    outputDiv.style.textShadow = "none";
    outputDiv.style.color = "white";
    outputDiv.style.textAlign = "left";
    outputDiv.style.height = "100vh";
  } else {
    helpButton.textContent = "?";
    helpButton.style.backgroundColor = "lime";
    outputDiv.innerHTML = `
    <h2>verbleibende Buchstaben: <span class="counter">${availableLetters.length}</span></h2>
    <span id="display"></span>
    <div id="mainCountdown"></div>`;
    outputDiv.style.height = "auto";
  }
});
