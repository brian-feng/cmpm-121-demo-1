import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My amazing super cool game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button: HTMLButtonElement = <HTMLButtonElement>(
  document.createElement("button")
);
button.textContent = "🧋";
app.append(button);
