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

function checkButtons() {
  upgrade1.disabled = gains < 10;
  upgrade2.disabled = gains < 20;
  upgrade3.disabled = gains < 30;
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

function setUpgrades(upgrade: HTMLButtonElement, text: string, cost: number, this_cps: number){
  upgrade.textContent = text
  upgrade.style.fontSize = "2em";
  upgrade.style.border = "4px solid transparent";
  upgrade.style.backgroundColor = "#b6b6b6";
  upgrade.disabled = true;
  upgrade.addEventListener("click", () => {
    gains -= cost;
    cps += this_cps;
  })
  app.append(upgrade);

}

const upgrade1 = <HTMLButtonElement>document.createElement("button");
const upgrade2 = <HTMLButtonElement>document.createElement("button");
const upgrade3 = <HTMLButtonElement>document.createElement("button");

setUpgrades(upgrade1, "Buy Dumbells", 10, 0.1);
setUpgrades(upgrade2, "Buy Plates", 20, 2);
setUpgrades(upgrade3, "Buy Creatine", 30, 10);

upgrade2.style.marginLeft = "10px";
upgrade3.style.marginLeft = "10px"; 