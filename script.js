// Language Switcher
let translations = {};
let currentLang = "de";
let languageChanged = false;

fetch("translations.json")
  .then((res) => res.json())
  .then((data) => {
    translations = data;

    const savedLang = localStorage.getItem("lang");
    if (savedLang) currentLang = savedLang;

    applyTranslations();

    const savedLastPage = localStorage.getItem("last_active_page") || "teacher";
    updatePage(savedLastPage);
  });

// Pages
function getPagesData() {
  const t = translations[currentLang];
  if (!t) return {};

  return {
    teacher: {
      title: t.assistentTeacher,
      icon: "👨‍🏫",
      content: formatContent(t.teacherContent),
    },
    tasks: {
      title: t.assistentTasks,
      icon: "💻",
      content: formatContent(t.tasksContent),
    },
    "code-helper": {
      title: t.assistentCode,
      icon: "🔎",
      content: formatContent(t.codeContent),
    },
    library: {
      title: t.assistentBibliothek,
      icon: "📚",
      content: formatContent(t.libraryContent),
    },
  };
}

function applyTranslations() {
  if (!translations[currentLang]) return;

  document.querySelectorAll("[data-key]").forEach((el) => {
    const key = el.getAttribute("data-key");

    if (el.tagName === "INPUT") {
      el.placeholder = translations[currentLang][key];
    } else {
      el.innerText = translations[currentLang][key];
    }
  });
}

// Language Switcher
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  languageChanged = true;

  ["teacher", "tasks", "code-helper", "library"].forEach((page) => {
    localStorage.removeItem(`azubihilfe_chat_${page}`);
  });

  applyTranslations();
  updatePage(window.currentPage || "teacher");
}

function formatContent(text) {
  return `<div class="ai-answer"><p>${text.replace(/\n/g, "<br>")}</p></div>`;
}

const buttons = document.querySelectorAll(".nav-btn");
const contentContainer = document.getElementById("dynamic-content");
const statusText = document.querySelector(".ai-status p");
const logoElement = document.getElementById("current-logo");

window.currentPage = "";

// Save Chat
function saveChatHistory(pageId) {
  const html = contentContainer.innerHTML;
  localStorage.setItem(`azubihilfe_chat_${pageId}`, html);
}

function loadChatHistory(pageId) {
  return localStorage.getItem(`azubihilfe_chat_${pageId}`);
}

// Update Page
function updatePage(pageId) {
  const pages = getPagesData();
  const data = pages[pageId];

  if (!data) return;

  if (window.currentPage) {
    saveChatHistory(window.currentPage);
  }

  localStorage.setItem("last_active_page", pageId);

  contentContainer.style.opacity = "0";

  setTimeout(() => {
    logoElement.textContent = data.icon;
    statusText.innerHTML = `${data.title} - ${translations[currentLang].status}`;

    let content;

    if (languageChanged) {
      content = data.content;
    } else {
      const saved = loadChatHistory(pageId);
      content = saved && saved.trim() !== "" ? saved : data.content;
    }

    contentContainer.innerHTML = content;
    languageChanged = false;

    buttons.forEach((btn) => btn.classList.remove("active"));

    const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
    if (activeBtn) activeBtn.classList.add("active");

    contentContainer.style.opacity = "1";
    contentContainer.scrollTop = contentContainer.scrollHeight;

    window.currentPage = pageId;
  }, 100);
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const pageId = button.getAttribute("data-page");
    if (pageId) updatePage(pageId);
  });
});

// Themen Switcher
const themeSwitch = document.getElementById("theme-switch");
const themeIcons = themeSwitch.querySelectorAll("img");

function updateIcons(isWhite){
  if (isWhite) {
    themeIcons[0].style.display = 'block';
    themeIcons[1].style.display = 'none';
  }else{
    themeIcons[0].style.display = 'none';
    themeIcons[1].style.display = 'block';
  }
}

const enableWhite = () => {
  document.body.classList.add("whitemode");
  localStorage.setItem("theme", "white");
  updateIcons(true);
}
const disableWhite = () => {
  document.body.classList.remove("whitemode");
  localStorage.setItem("theme", "dark")
  updateIcons(false);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "white") {
  enableWhite();
} else {
  disableWhite();
}

themeSwitch.addEventListener("click", () => {
  const isWhite = document.body.classList.contains("whitemode");
  if (isWhite) {
    disableWhite();
  } else {
    enableWhite();
  }
})