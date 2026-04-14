const sendBtn = document.querySelector(".send-button");
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
  thinking.className = "ai-thinking";
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

    if (!response.ok) throw new Error("Network error");

    const aiAnswer = await response.text();

    thinking.remove();
    chatField.innerHTML += `
            <div class="ai-answer"><p>${aiAnswer}</p></div>
        `;
        if (window.currentPage) {
          localStorage.setItem(`azubihilfe_chat_${window.currentPage}`, chatField.innerHTML);
    }
  } catch (error) {
    thinking.innerHTML = "<p>Ups! Da gab es einen Fehler...</p>";
    console.error(error);
  }

  chatField.scrollTop = chatField.scrollHeight;

  // Сохраняем историю текущей вкладки после каждого сообщения
  if (window.currentPage) {
    localStorage.setItem(
      `azubihilfe_chat_${window.currentPage}`,
      chatField.innerHTML
    );
  }
}

sendBtn.addEventListener("click", askAI);
inputField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") askAI();
});