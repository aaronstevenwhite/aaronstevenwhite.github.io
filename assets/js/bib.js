
/* Dropdown  function on Papers page to show bibtext content from files JS Start */
function toggleBibliography(id) {
  const x = document.getElementById(id);
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}
/* Dropdown  function on Papers page to show bibtext content from files JS End */

/* Copy to clipboard function on Papers page on Dropdown JS Start */
function copyToClipboard(unique_id) {
  const content = document.getElementById(unique_id + '-content');
  const tempTextarea = document.createElement("textarea");
  tempTextarea.value = content.innerText;
  document.body.appendChild(tempTextarea);
  tempTextarea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextarea);

  const message = document.getElementById(unique_id + '-message');
  message.style.display = 'inline';

  setTimeout(function () {
    message.style.display = 'none';
  }, 2000);
}
/* Copy to clipboard function on Papers page on Dropdown JS End */
