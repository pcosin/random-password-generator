const $btnGenerete = document.querySelector("[data-btn-generete]");
const $divOutput = document.querySelector("[data-outupt-div]");
const $noNumbersCheckbox = document.querySelector("[data-mycheck-numbers]");
const $noSymbolsCheckbox = document.querySelector("[data-mycheck-symbols]");
const $sliderNumber = document.querySelector("[data-slider-number]");
const $slider = document.querySelector("[data-slider]");
const $copied = document.querySelector("[data-copied]");

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
  const lengthOfPassword = getSliderNumber();
  const lengthOfCharacters = characters.length;
  let password = "";
  let i = 0;

  while (password.length < lengthOfPassword) {
    let index = Math.floor(Math.random() * lengthOfCharacters);
    let char = characters[index];
    if (!includeNumbers && /\d/.test(char)) {
      continue;
    }
    if (!includeSymbols && /\W/.test(char)) {
      continue;
    }
    password += char;
    i++;
  }

  return password;
}

$btnGenerete.addEventListener("click", (event) => {
  event.preventDefault();
  let includeNumbers = $noNumbersCheckbox.checked;
  let includeSymbols = $noSymbolsCheckbox.checked;
  let resultPassword = randomPassword(characters, includeNumbers, includeSymbols);
  renderPassword($divOutput, resultPassword);
  removeCopiedText();
});

function renderPassword(container, password) {
  container.textContent = "";
  let p = document.createElement("p");
  p.classList.add("text");
  p.textContent = password;
  container.appendChild(p);
}

$slider.addEventListener("input", () => {
  $sliderNumber.innerHTML = $slider.value;
});

function getSliderNumber() {
  console.log($slider.value);
  return $slider.value;
}

const copyContent = async () => {
  const text = document.querySelector(".text");
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text.innerHTML);
    console.log("Content copied to clipboard");
    showCopiedText();
    setTimeout(() => {
      $copied.style.visibility = "hidden";
    }, 5000);
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

document.addEventListener("click", (event) => {
  if (event.target.matches(".text")) {
    copyContent();
  }
});

function showCopiedText() {
  $copied.style.visibility = "visible";
  $copied.classList.add("show");
}

function removeCopiedText() {
  $copied.style.visibility = "hidden";
  $copied.classList.remove("show");
}
