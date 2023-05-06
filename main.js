import "./style.css";

const $btnGenerete = document.querySelector("[data-btn-generete]");
const $containeOutput = document.querySelector("[data-container-password-outup]");
const $divOutput = document.querySelectorAll("[data-outupt-div]");
const $noNumbersCheckbox = document.querySelector("[data-mycheck-numbers]");
const $noSymbolsCheckbox = document.querySelector("[data-mycheck-symbols]");

const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

function randomPassword(characters, includeNumbers, includeSymbols) {
  const lengthOfPassword = 11;
  const lengthOfCharacters = characters.length;
  let password = "";

  for (let i = 0; i <= lengthOfPassword; i++) {
    let index = Math.floor(Math.random() * lengthOfCharacters);
    let char = characters[index];
    if (!includeNumbers && /\d/.test(char)) {
      i--;
      continue;
    }
    if (!includeSymbols && /\W/.test(char)) {
      i--;
      continue;
    }
    password += char;
  }
  return password;
}

$btnGenerete.addEventListener("click", (event) => {
  event.preventDefault();
  let includeNumbers = $noNumbersCheckbox.checked;
  let includeSymbols = $noSymbolsCheckbox.checked;
  let resultPassword1 = randomPassword(characters, includeNumbers, includeSymbols);
  let resultPassword2 = randomPassword(characters, includeNumbers, includeSymbols);
  renderPassword($divOutput, resultPassword1, resultPassword2);
});

function renderPassword(containers, password1, password2) {
  containers.forEach((container, index) => {
    container.textContent = "";
    let p = document.createElement("p");
    p.classList.add("text");
    p.textContent = index === 0 ? password1 : password2;
    container.appendChild(p);
  });
}

const copyContent = async () => {
  const text = document.querySelector(".text");
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text.innerHTML);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

document.addEventListener("click", (event) => {
  if (event.target.matches(".text")) {
    copyContent();
  }
});
