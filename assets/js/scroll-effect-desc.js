
  window.addEventListener("scroll", function () {
    const bgImage = document.getElementById("bg");
    const scrollPosition = window.pageYOffset - bgImage.offsetTop;

    // Apply parallax for screens between 1200px and 1440px
    if (window.innerWidth > 1200 && window.innerWidth < 1440) {
      const parallaxSpeed = 0.2; // Use a very subtle parallax effect to avoid jumping
      bgImage.style.backgroundPositionY = (scrollPosition * parallaxSpeed) + "px";
    } 
    // For ultra-wide screens (1440px and above), disable parallax effect
    else if (window.innerWidth >= 1440) {
      bgImage.style.backgroundPositionY = "center"; // Fixed background for larger screens
    }
  });


