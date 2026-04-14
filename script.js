const pagesData = {
  teacher: {
    title: "Lehrer-Assistent",
    icon: "👨‍🏫",
    content: `
        <div class="ai-answer"><p>Hallo! Ich bin dein KI-Lehrer, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit: <br><br>•	Programmierkonzepten & Theorie <br>•	Mathe & Logik für Programmierer <br>•	Lernstrategien & Erklärungen <br><br>Ich antworte auf Deutsch und erkläre alles mit lebendigen Metaphern. </p></div>
        `,
  },
  tasks: {
    title: "Aufgaben-Assistent",
    icon: "💻",
    content: `
            <div class="ai-answer"><p>Hallo! Ich bin dein Aufgaben-Assistent, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit: <br><br>•	Aufgaben erstellen <br>•	Mathe & Logik beibringen <br>•	Aufgaben mit Lernstrategien & Erklärungen geben<br><br>Ich screibe alles auf Deutsch, kurz und einfach.</p></div>
        `,
  },
  "code-helper": {
    title: "Code-Experte",
    icon: "🔎",
    content: `
            <div class="ai-answer"><p>Hallo! Ich bin dein Code-Helfer-Assistent, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit Debugging <br> Sag mir einfach was ich anschauen soll. <br>Ich schaue alles an und sage dir deine Fehler<br><br>Ich screibe alles kurz und einfach.</p></div>
        `,
  },
  library: {
    title: "Wissensdatenbank",
    icon: "📚",
    content: `
            <div class="ai-answer"><p>Willkommen in der Bibliothek...<br><br> Hier kannst du alle wichtige Begriffe speichern und anschauen!</p></div>
        `,
  },
};

const buttons = document.querySelectorAll(".nav-btn");
const contentContainer = document.getElementById("dynamic-content");
const statusText = document.querySelector(".ai-status p");
const logoElement = document.getElementById("current-logo");

// Текущая активная вкладка — глобальная переменная
window.currentPage = "";

// ─── localStorage helpers ────────────────────────────────────────────────────

// Сохранить HTML содержимое чата для конкретной вкладки
function saveChatHistory(pageId) {
  const html = contentContainer.innerHTML;
  localStorage.setItem(`azubihilfe_chat_${pageId}`, html);
}

// Загрузить HTML содержимое чата для конкретной вкладки
// Возвращает null если истории нет
function loadChatHistory(pageId) {
  return localStorage.getItem(`azubihilfe_chat_${pageId}`);
}

// ─── Page switching ───────────────────────────────────────────────────────────

function updatePage(pageId) {
  const data = pagesData[pageId];
  if (!data) return;

  // Сохраняем историю той вкладки, с которой уходим
  if (window.currentPage) {
    saveChatHistory(window.currentPage);
  }

  localStorage.setItem('last_active_page', pageId);

  contentContainer.style.opacity = "0";

  setTimeout(() => {
    logoElement.textContent = data.icon;
    statusText.innerHTML = `${data.title} <span>- Bereit</span>`;

    // Загружаем сохранённую историю, или показываем приветствие
    const saved = loadChatHistory(pageId);
    contentContainer.innerHTML = saved && saved.trim() !== "" ? saved : data.content;

    buttons.forEach((btn) => btn.classList.remove("active"));
    const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    contentContainer.style.opacity = "1";
    contentContainer.scrollTop = contentContainer.scrollHeight;

    // Обновляем текущую вкладку
    window.currentPage = pageId;
  }, 100);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.getAttribute("data-page");
    if (pageId) updatePage(pageId);
  });
});

// ─── On load: открыть вкладку teacher ────────────────────────────────────────

window.addEventListener("load", () => {
  const savedLastPage = localStorage.getItem('last_active_page') || "teacher";
  updatePage(savedLastPage);
});

// ─── Theme switcher (без изменений) ──────────────────────────────────────────

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