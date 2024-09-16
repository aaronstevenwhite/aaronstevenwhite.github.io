document.addEventListener("DOMContentLoaded", function () {
  const fadeElements = document.querySelectorAll('.fade-in');

  function handleScroll() {
    fadeElements.forEach(function (element) {
      const rect = element.getBoundingClientRect();

      if (rect.top < window.innerHeight && rect.bottom > 0) {

        if (element.classList.contains('fade-up')) {
          element.classList.add('animate__animated', 'animate__fadeInUp');
        } 
        else if (window.innerWidth <= 900) {
          element.classList.add('animate__animated', 'animate__fadeInUp');
        } else if (element.classList.contains('fade-left')) {
          element.classList.add('animate__animated', 'animate__fadeInLeft');
        } else if (element.classList.contains('fade-right')) {
          element.classList.add('animate__animated', 'animate__fadeInRight');
        }
      }
    });
  }


  window.addEventListener('scroll', handleScroll);
  

  handleScroll();
});