const pagesData = {
    'lehrer': {
        title: "Lehrer-Assistent",
        icon: "👨‍🏫",
        content: `
        <div class="ki-answer"><p>👋 Hallo! Ich bin dein KI-Lehrer, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit: <br><br>•	Programmierkonzepten & Theorie <br>•	Mathe & Logik für Programmierer <br>•	Lernstrategien & Erklärungen <br><br>Ich antworte auf Deutsch und erkläre alles mit lebendigen Metaphern. 🎨</p>
          <div class="time-stamp">
            <p>14:26</p>
          </div>
        </div>
        <div class="user-question-row">
          <div class="user-question"><p>Hallo! Ich lerne gerade Programmierung und habe einige Fragen. <br><br>Kannst du mir die Grundlagen von JavaScript einfach erklären? <br>  Was ist der Unterschied zwischen Variablen und Konstanten? <br> Wie funktionieren Funktionen und wann benutzt man sie? <br>Ich habe auch Probleme mit Schleifen – kannst du Beispiele geben? <br> Was bedeutet „asynchroner Code“ und warum ist er wichtig? <br>Wie kann ich meine Fehler im Code besser finden? <br>Hast du Tipps, wie ich effizient Programmieren lernen kann? <br> Welche Projekte sind gut für Anfänger geeignet? <br>Vielen Dank für deine Hilfe!</p></div>
        </div>
        <div class="ki-thinking"><p>Lass mich kurz überlegen...</p></div>
        `
    },
    'aufgaben': {
        title: "Aufgaben-Assistent",
        icon: "💻",
        content: `
            <div class="ki-answer"><p>👋 Hi! Ich bin dein Aufgaben-Assistent, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit: <br><br>•	Aufgaben erstellen <br>•	Mathe & Logik beibringen <br>•	Aufgaben mit Lernstrategien & Erklärungen geben<br><br>Ich screibe alles auf Deutsch, kurz und einfach.👌</p></div>
        `
    },
    'code-helfer': {
        title: "Code-Experte",
        icon: "🔎",
        content: `
            <div class="ki-answer"><p>🔎 👋 Hola! Ich bin dein Code-Helfer-Assistent, betrieben von Mistral AI. <br><br> Ich kann dir helfen mit Debugging <br> Sag mir einfach was ich anschauen soll. <br>Ich schaue alles an und sage dir deine Fehler🔥<br><br>Ich screibe alles kurz und einfach.👌</p></div>
        `
    },
    'bibliotek': {
        title: "Wissensdatenbank",
        icon: "📚",
        content: `
            <div class="ki-answer"><p>📚 Willkommen in der Bibliothek...<br><br> Hier kannst du alle wichtige Begriffe speichern und anschauen!</p></div>
        `
    }
};

const buttons = document.querySelectorAll('.nav-btn');
const contentContainer = document.getElementById('dynamic-content');
const statusText = document.querySelector('.ki-status p');
const logoElement = document.getElementById('current-logo');

function updatePage(pageId) {
    const data = pagesData[pageId];
    if (!data) return;


    contentContainer.style.opacity = '0';

    setTimeout(() => {
        logoElement.textContent = data.icon;

        contentContainer.innerHTML = data.content;

        statusText.innerHTML = `${data.title} <span>- Bereit</span>`;


        buttons.forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
        if (activeBtn) activeBtn.classList.add('active');


        contentContainer.style.opacity = '1';
    }, 100);
}


buttons.forEach(button => {
    button.addEventListener('click', () => {
        const pageId = button.getAttribute('data-page');
        updatePage(pageId);
    });
});


updatePage('lehrer');