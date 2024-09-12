const btnE1 = document.getElementById("btn");
const quoteE1 = document.getElementById("quote");
const authorE1 = document.getElementById("author");
const quoteCat = document.getElementById("quoteCat");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const themeToggle = document.getElementById("theme-toggle");

const apiURL = "https://api.quotable.io/random";

const quoteList = [];
let currentIndex = -1;

function updateQuote() {
  if (quoteList.length === 0) {
    quoteE1.innerText = '"No quotes available."';
    prevBtn.disabled = true;
    nextBtn.disabled = true;
  } else {
    quoteE1.innerText = quoteList[currentIndex];
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === quoteList.length - 1;
  }
}

async function getQuote() {
  try {
    btnE1.innerText = "Random";
    btnE1.disabled = true;
    quoteE1.innerText = "Updating...";
    const response = await fetch(`${apiURL}?tags=${quoteCat.value}`);
    const data = await response.json();
    const quoteContent = data.content;
    quoteList.push(quoteContent);
    quoteE1.innerText = quoteContent;
    btnE1.innerText = "Random";
    btnE1.disabled = false;
    console.log(data);
  } catch (error) {
    console.log(error);
    quoteE1.innerText = "An error happened, try again later";
    authorE1.innerText = "An error happened";
    btnE1.innerText = "Random";
    btnE1.disabled = false;
  }
}

getQuote();

btnE1.addEventListener("click", getQuote);

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateQuote();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentIndex < quoteList.length - 1) {
    currentIndex++;
    updateQuote();
  }
});

themeToggle.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  themeToggle.textContent = isDarkMode
    ? "Switch to Light Mode"
    : "Switch to Dark Mode";
});
