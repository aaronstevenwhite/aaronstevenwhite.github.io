/* Arrows JS Start */

function scrollLeftAction() {
  const filterContainer = document.getElementById('filterContainer');
  filterContainer.scrollBy({ left: -300, behavior: 'smooth' });
  setTimeout(checkArrows, 300);
}

function scrollRightAction() {
  const filterContainer = document.getElementById('filterContainer');
  filterContainer.scrollBy({ left: 300, behavior: 'smooth' });
  setTimeout(checkArrows, 300);
}

function checkArrows() {
  const filterContainer = document.getElementById('filterContainer');
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');

  if (filterContainer.scrollLeft > 0) {
    leftArrow.style.display = 'block';
  } else {
    leftArrow.style.display = 'none';
  }

  if (filterContainer.scrollLeft + filterContainer.clientWidth >= filterContainer.scrollWidth) {
    rightArrow.style.display = 'none';
  } else {
    rightArrow.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.left-arrow').addEventListener('click', scrollLeftAction);
  document.querySelector('.right-arrow').addEventListener('click', scrollRightAction);

  checkArrows();

  document.getElementById('filterContainer').addEventListener('scroll', checkArrows);
});
/* Arrows JS End */


/* Function to filter papers by year JS Start*/
function filterPapers(year) {
  const btns = document.querySelectorAll('#filterContainer button');
  const paperGroups = document.querySelectorAll('.papers-container .paper-group');

  btns.forEach(btn => btn.classList.remove('active'));


  const activeButton = document.querySelector(`#filterContainer button[data-year="${year}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  } else {
    console.error(`Button with data-year="${year}" not found.`);
  }

  paperGroups.forEach(group => {
    if (group.classList.contains(year)) {
      group.classList.add('active');
    } else {
      group.classList.remove('active');
    }
  });
}

/* Function to filter presentations by year JS Start*/
function filterPresentation(year) {
  const btns = document.querySelectorAll('#filterContainer button');
  const presentationGroups = document.querySelectorAll('.presentations-container .presentations');


  btns.forEach(btn => btn.classList.remove('active'));


  const activeButton = document.querySelector(`#filterContainer button[data-year="${year}"]`);
  if (activeButton) {
    activeButton.classList.add('active');
  }

  presentationGroups.forEach(group => {
    if (group.classList.contains(year)) {
      group.classList.add('active');
    } else {
      group.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const yearButtons = document.querySelectorAll('#filterContainer button');


  yearButtons.forEach(button => {
    button.addEventListener('click', function () {
      const year = this.getAttribute('data-year');
      filterPapers(year);
      filterPresentation(year);
    });
  });


  filterPapers('2024');
  filterPresentation('2024');
  checkArrows();
});
/* Function to filter papers/presentations by year JS End*/


