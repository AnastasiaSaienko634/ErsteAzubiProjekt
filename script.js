// Pages Data
const pagesData = {
  lehrer: {
    title: "Lehrer-Assistent",
    icon: "👨‍🏫",
    content: `
        <div class="ki-answer"><p>Hallo! Ich bin dein KI-Lehrer, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit: <br><br>•	Programmierkonzepten & Theorie <br>•	Mathe & Logik für Programmierer <br>•	Lernstrategien & Erklärungen <br><br>Ich antworte auf Deutsch und erkläre alles mit lebendigen Metaphern. </p></div>
        `,
  },
  aufgaben: {
    title: "Aufgaben-Assistent",
    icon: "💻",
    content: `
            <div class="ki-answer"><p>Hallo! Ich bin dein Aufgaben-Assistent, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit: <br><br>•	Aufgaben erstellen <br>•	Mathe & Logik beibringen <br>•	Aufgaben mit Lernstrategien & Erklärungen geben<br><br>Ich screibe alles auf Deutsch, kurz und einfach.</p></div>
        `,
  },
  "code-helfer": {
    title: "Code-Experte",
    icon: "🔎",
    content: `
            <div class="ki-answer"><p>Hallo! Ich bin dein Code-Helfer-Assistent, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit Debugging <br> Sag mir einfach was ich anschauen soll. <br>Ich schaue alles an und sage dir deine Fehler<br><br>Ich screibe alles kurz und einfach.</p></div>
        `,
  },
  bibliotek: {
    title: "Wissensdatenbank",
    icon: "📚",
    content: `
            <div class="ki-answer"><p>Willkommen in der Bibliothek...<br><br> Hier kannst du alle wichtige Begriffe speichern und anschauen!</p></div>
        `,
  },
};

const buttons = document.querySelectorAll(".nav-btn");
const contentContainer = document.getElementById("dynamic-content");
const statusText = document.querySelector(".ki-status p");
const logoElement = document.getElementById("current-logo");

// Switching pages
function updatePage(pageId) {
  const data = pagesData[pageId];
  if (!data) return;

  contentContainer.style.opacity = "0";

  setTimeout(() => {
    logoElement.textContent = data.icon;

    contentContainer.innerHTML = data.content;

    statusText.innerHTML = `${data.title} <span>- Bereit</span>`;

    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    contentContainer.style.opacity = "1";
  }, 100);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.getAttribute("data-page");
    updatePage(pageId);
  });
});

updatePage("lehrer");

// AI
const sendBtn = document.querySelector(".senden-button");
const inputField = document.querySelector(".message-input");
const chatField = document.getElementById("dynamic-content");

async function askAI() {
  const text = inputField.value.trim();

  if (!text) return;

  inputField.value = "";
  chatField.innerHTML += `
        <div class="user-question-row">
            <div class="user-question"><p>${text}</p></div>
        </div>
    `;

  const thinking = document.createElement("div");
  thinking.className = "ki-thinking";
  thinking.innerHTML = "<p>Lass mich kurz überlegen...</p>";
  chatField.appendChild(thinking);
  chatField.scrollTop = chatField.scrollHeight;

  try {
    // Sending in Make.com
    const response = await fetch(
      "https://hook.eu1.make.com/kpm5emxyzl6hpq4bv1vx6xkq2eib6g7t",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      },
    );

    if (!response.ok) throw new Error("Ошибка сети");

    const aiAnswer = await response.text();

    thinking.remove();
    chatField.innerHTML += `
            <div class="ki-answer"><p>${aiAnswer}</p></div>
        `;
    saveChatHistory();
  } catch (error) {
    thinking.innerHTML = "<p>Ups! Da gab es einen Fehler...</p>";
    console.error(error);
  }

  chatField.scrollTop = chatField.scrollHeight;
}

sendBtn.addEventListener("click", askAI);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") askAI();
});

// Themes Switch
const themeSwitch = document.getElementById("theme-switch");
const themeIcons = themeSwitch.querySelectorAll("img");

function updateIcons(activeTheme) {
  themeIcons.forEach((img) => (img.style.display = "none"));
  if (activeTheme === "whitemode") {
    themeIcons[2].style.display = "block";
  } else if (activeTheme === "darkmode") {
    themeIcons[1].style.display = "block";
  } else {
    themeIcons[0].style.display = "block";
  }
}

const enableWhite = () => {
  document.body.classList.add("whitemode");
  document.body.classList.remove("darkmode");
  localStorage.setItem("theme", "white");
  updateIcons("whitemode");
};

const enableDark = () => {
  document.body.classList.add("darkmode");
  document.body.classList.remove("whitemode");
  localStorage.setItem("theme", "dark");
  updateIcons("darkmode");
};

const disableAll = () => {
  document.body.classList.remove("whitemode", "darkmode");
  localStorage.setItem("theme", "cosmos");
  updateIcons("default");
};

let savedTheme = localStorage.getItem("theme");
if (savedTheme === "white") enableWhite();
else if (savedTheme === "dark") enableDark();
else updateIcons("default");

themeSwitch.addEventListener("click", () => {
  savedTheme = localStorage.getItem("theme");

  if (savedTheme !== "white" && savedTheme !== "dark") {
    enableWhite();
  } else if (savedTheme === "white") {
    enableDark();
  } else {
    disableAll();
  }
});
