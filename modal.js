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
