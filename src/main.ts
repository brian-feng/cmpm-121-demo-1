import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "CLICK TO LIFT";
document.title = gameName;
let gains: number = 0;

function makeHeader(): HTMLElement {
  const header = document.createElement("h1");
  header.innerHTML = "CLICK TO LIFT";
  return header;
}

function makeGainsText(): HTMLElement {
  const gainsText = document.createElement("h2");
  gainsText.innerHTML = "GAINS: " + gains.toString();
  return gainsText;
}

function updateGainsText() {
  gainsText.innerHTML =
    "GAINS: " + (Math.round(gains * 100) / 100).toFixed(2).toString();
}

function increaseGains() {
  gains += 1;
  updateGainsText();
  new Event("check");
}

function makeButton(): HTMLButtonElement {
  const button: HTMLButtonElement = <HTMLButtonElement>(
    document.createElement("button")
  );
  button.textContent = "💪";
  button.addEventListener("click", increaseGains);
  return button;
}

const gainsText: HTMLElement = makeGainsText();
const button: HTMLButtonElement = makeButton();
app.append(makeHeader());
app.append(gainsText);
app.append(button);



let cps: number = 0;
let start: DOMHighResTimeStamp;
function increaseGainsByFrame(timestamp: DOMHighResTimeStamp) {
  if (start == undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;
  gains += (cps * elapsed) / 1000;
  updateGainsText();
  checkButtons();
  start = <number>document.timeline.currentTime;
  requestAnimationFrame(increaseGainsByFrame);
}
requestAnimationFrame(increaseGainsByFrame);

app.append(document.createElement("body"));
const upgrade1 = <HTMLButtonElement>document.createElement("button");
upgrade1.textContent = "Buy Heavier Dumbbells";
upgrade1.style.fontSize = "2em";
upgrade1.style.border = "4px solid transparent";
upgrade1.style.backgroundColor = "#b6b6b6";

function upgrade1Click() {
  cps += 0.1;
  gains -= 10;
}

function checkButtons() {
  upgrade1.disabled = gains < 10;
}

upgrade1.addEventListener("click", upgrade1Click);
upgrade1.disabled = true;
app.append(upgrade1);

const upgrade2 = <HTMLButtonElement>document.createElement("button");
upgrade2.textContent = "Buy Plates";
const spacer = document.createElement("space");
app.append(spacer);
app.append(upgrade2);
