const settings = document.querySelector(".settings");
const modal = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal-container");
const closeModalBtn = document.querySelector(".close-modal-btn");


const openModal = () => {
  settings.addEventListener("click", () => {
    modal.classList.add("activeModal");
  });
};

openModal();


const closeModal = () => {
  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("activeModal");
  });
};

closeModal();

const deleteBtn = document.getElementById("chat-delete");


deleteBtn.addEventListener("click", () => {

  const confirmDelete = confirm("Möchtest du den Chat-Verlauf wirklich löschen?");
  
  if (confirmDelete) {
    const pageId = window.currentPage;

    localStorage.removeItem(`azubihilfe_chat_${pageId}`);

    
    if (typeof pagesData !== 'undefined' && pagesData[pageId]) {
      const contentContainer = document.getElementById("dynamic-content");
      contentContainer.innerHTML = pagesData[pageId].content;
      
     
      contentContainer.scrollTop = 0;
    }

   
    modal.classList.remove("activeModal");
    
    console.log(`История для ${pageId} удалена.`);
  }
});