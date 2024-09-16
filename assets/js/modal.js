document.addEventListener('DOMContentLoaded', function () {
  const modal = document.getElementById("scheduleModal");
  const iframe = document.getElementById("modalIframe");
  const btn = document.getElementById("scheduleBtn");
  const span = document.getElementsByClassName("close")[0];
  const bodyLock = document.querySelector('body');


  btn.onclick = function (event) {
    event.preventDefault();
    iframe.src = "https://app.squarespacescheduling.com/schedule.php?owner=26977798";
    modal.style.display = "flex";
    bodyLock.classList.add('lock');
  }


  span.onclick = function () {
    modal.style.display = "none";
    iframe.src = "";
    bodyLock.classList.remove('lock');
  }

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      iframe.src = "";
      bodyLock.classList.remove('lock');
    }
  }
});