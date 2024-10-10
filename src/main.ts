import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Lifty Clicker";
document.title = gameName;
const header = document.createElement("h1");
header.innerHTML = "CLICK TO LIFT";
app.append(header);

let gains: number = 0;
const gainsText = document.createElement("h2");
gainsText.innerHTML = "GAINS: " + gains.toString();
app.append(gainsText);

const button: HTMLButtonElement = <HTMLButtonElement>(
  document.createElement("button")
);
button.textContent = "💪";
app.append(button);

button.onclick = () => {
  gains += 1;
  gainsText.innerHTML = "GAINS: " + gains.toString();
  console.log(gains);
};
