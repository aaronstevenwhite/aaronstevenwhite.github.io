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
  
  
  /* Function to filter papers by topic JS Start*/
  function filterPapers(topic) {
    const btns = document.querySelectorAll('#filterContainer button');
    const paperGroups = document.querySelectorAll('.papers-container .paper-group');
  
    btns.forEach(btn => btn.classList.remove('active'));
  
    const activeButton = document.querySelector(`#filterContainer button[data-topic="${topic}"]`);
    if (activeButton) {
      activeButton.classList.add('active');
    } else {
      console.error(`Button with data-topic="${topic}" not found.`);
    }
  
    paperGroups.forEach(group => {
      if (group.classList.contains(topic)) {
        group.classList.add('active');
      } else {
        group.classList.remove('active');
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const topicButtons = document.querySelectorAll('#filterContainer button');
  
    topicButtons.forEach(button => {
      button.addEventListener('click', function () {
        const topic = this.getAttribute('data-topic');
        filterPapers(topic);
      });
    });
  
    // Activate the first topic by default
    const firstTopic = topicButtons[0]?.getAttribute('data-topic');
    if (firstTopic) {
      filterPapers(firstTopic);
    }
    
    checkArrows();
  });
  /* Function to filter papers by topic JS End*/