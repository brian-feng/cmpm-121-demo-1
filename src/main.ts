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

function makeGainsConstant(): HTMLElement {
  const gainsConstant = document.createElement("h2");
  gainsConstant.innerHTML = "GAINS: ";
  gainsConstant.style.marginBottom = "1px";
  return gainsConstant;
}
function makeGainsText(): HTMLElement {
  const gainsText = document.createElement("h2");
  gainsText.innerHTML = gains.toString();
  gainsText.style.marginTop = "1px";
  return gainsText;
}

function updateGainsText() {
  gainsText.innerHTML = (Math.round(gains * 100) / 100).toFixed(2).toString();
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

interface Item {
  name: string;
  cost: number;
  rate: number;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Dumbbells",
    cost: 10,
    rate: 0.1,
    description: "Buy heavy dumbbells to curl",
  },
  {
    name: "Plates",
    cost: 100,
    rate: 2,
    description: "Buy heavy plates to squat",
  },
  {
    name: "Protein Shake",
    cost: 1000,
    rate: 50,
    description: "Buy protein shakes to grow",
  },
  {
    name: "Creatine",
    cost: 10000,
    rate: 100,
    description: "Buy creatine to get swole",
  },
  {
    name: "Steroids",
    cost: 100000,
    rate: 1000,
    description: "Sometimes in life there are shortcuts",
  },
];

const gainsConstant: HTMLElement = makeGainsConstant();
const gainsText: HTMLElement = makeGainsText();
const button: HTMLButtonElement = makeButton();
app.append(makeHeader());
app.append(gainsConstant);
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

function makeGPSText(): HTMLElement {
  const gpsText = document.createElement("h2");
  gpsText.innerHTML =
    "GAINS per second: " + (Math.round(cps * 100) / 100).toFixed(1).toString();
  return gpsText;
}

function updateGPSText(gpsText: HTMLElement) {
  gpsText.innerHTML =
    "GAINS per second: " + (Math.round(cps * 100) / 100).toFixed(1).toString();
}

const gpsText = makeGPSText();
app.append(gpsText);

function makeUpgrades(item: Item) {
  const upgrade = <HTMLButtonElement>document.createElement("button");
  upgrade.textContent = item.name;
  upgrade.style.fontSize = "2em";
  upgrade.style.border = "4px solid transparent";
  upgrade.style.backgroundColor = "#b6b6b6";
  upgrade.disabled = true;
  upgrade.title = item.description;
  upgrade.addEventListener("click", () => {
    gains -= item.cost;
    cps += item.rate;
    updateGPSText(gpsText);
    item.cost *= 1.15;
  });
  app.append(upgrade);
  return upgrade;
}

const upgrades: HTMLButtonElement[] = [];
for (let i = 0; i < availableItems.length; i++) {
  upgrades.push(makeUpgrades(availableItems[i]));
  if (i > 0) {
    upgrades[i].style.marginLeft = "10px";
  }
}

function checkButtons() {
  for (let i = 0; i < availableItems.length; i++) {
    upgrades[i].disabled = gains < availableItems[i].cost;
  }
}
