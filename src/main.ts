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
  gainsText.style.marginTop = "1px" ;
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

const prices = [10, 20, 30];
function checkButtons() {
  upgrade1.disabled = gains < prices[0];
  upgrade2.disabled = gains < prices[1];
  upgrade3.disabled = gains < prices[2];
}

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
  gpsText.innerHTML = "GAINS per second: " + cps.toString();
  return gpsText;
}

function updateGPSText(gpsText: HTMLElement) {
  gpsText.innerHTML = "GAINS per second: " + cps.toString();
}

const gpsText = makeGPSText();
app.append(gpsText);

function setUpgrades(
  upgrade: HTMLButtonElement,
  text: string,
  price_index: number,
  this_cps: number,
) {
  upgrade.textContent = text;
  upgrade.style.fontSize = "2em";
  upgrade.style.border = "4px solid transparent";
  upgrade.style.backgroundColor = "#b6b6b6";
  upgrade.disabled = true;
  upgrade.addEventListener("click", () => {
    gains -= prices[price_index];
    cps += this_cps;
    updateGPSText(gpsText);
    prices[price_index] *= 1.15;
  });
  app.append(upgrade);
}

const upgrade1 = <HTMLButtonElement>document.createElement("button");
const upgrade2 = <HTMLButtonElement>document.createElement("button");
const upgrade3 = <HTMLButtonElement>document.createElement("button");

setUpgrades(upgrade1, "Buy Dumbells", 0, 0.1);
setUpgrades(upgrade2, "Buy Plates", 1, 2);
setUpgrades(upgrade3, "Buy Creatine", 2, 10);

upgrade2.style.marginLeft = "10px";
upgrade3.style.marginLeft = "10px";
