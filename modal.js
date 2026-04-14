const settings = document.querySelector(".settings");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const closeModalBtn = document.querySelector(".close-modal-btn");

// Open Modal function
const openModal = () => {
  settings.addEventListener("click", () => {
    modal.classList.add("activeModal");
  });
};

openModal();

// Close Modal function
const closeModal = () => {
  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("activeModal");
  });
};

closeModal();

const deleteBtn = document.getElementById("chat-delete");

// Функция очистки
deleteBtn.addEventListener("click", () => {
  // 1. Спрашиваем подтверждение у пользователя
  const confirmDelete = confirm("Möchtest du den Chat-Verlauf wirklich löschen?");
  
  if (confirmDelete) {
    // 2. Получаем ID текущей страницы (например, "teacher")
    const pageId = window.currentPage;

    // 3. Удаляем историю из localStorage для текущей вкладки
    localStorage.removeItem(`azubihilfe_chat_${pageId}`);

    // 4. Возвращаем стандартное приветствие из объекта pagesData (который в script.js)
    if (typeof pagesData !== 'undefined' && pagesData[pageId]) {
      const contentContainer = document.getElementById("dynamic-content");
      contentContainer.innerHTML = pagesData[pageId].content;
      
      // Прокрутка вверх
      contentContainer.scrollTop = 0;
    }

    // 5. Закрываем модальное окно после очистки
    modal.classList.remove("activeModal");
    
    console.log(`История для ${pageId} удалена.`);
  }
});