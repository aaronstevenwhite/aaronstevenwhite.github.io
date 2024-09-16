const mobileMenu = document.querySelector('.nav');
const menuBtn = document.querySelector('.burger');
const bodyLock = document.querySelector('body');
const logo = document.querySelector('.logo__text');
menuBtn.addEventListener("click", showMenu);

function showMenu() {
  mobileMenu.classList.toggle('active');
  logo.classList.toggle('active');
  menuBtn.classList.toggle('active');
  //bodyLock.classList.toggle('lock');
};


mobileMenu.onclick = function(event) {
  if (event.target !== button)
    mobileMenu.style.display = "none";
    event.stopPropagation();
}