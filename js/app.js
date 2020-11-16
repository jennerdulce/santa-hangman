// -------------- MODAL -----------------

var modalBtn = document.querySelector('.modal-btn');
var modalBg = document.querySelector('.modal-bg');
var modalClose = document.querySelector('.modal-close');

modalBtn.addEventListener('click', openModal);

function openModal(){
  modalBg.classList.add('bg-active');
}

modalClose.addEventListener('click', closeModal);

function closeModal(){
  modalBg.classList.remove('bg-active');
}
