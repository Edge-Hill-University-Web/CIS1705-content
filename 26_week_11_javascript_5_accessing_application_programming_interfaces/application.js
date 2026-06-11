/* jshint esnext: true, browser: true */ // This line sets up the Web Teaching Environment for modern browser-based JavaScript
'use strict';

// JSON data goes here

// Function to create HTML from JSON goes here


// Function to handle showing reviews
function showReviews(event) {
  event.preventDefault();

  let article = this.closest('article');
  let reviews = article.querySelector('.reviews');
  reviews.classList.remove('hidden');

  this.classList.add('hidden');
  this.nextElementSibling.classList.remove('hidden');
}

// Function to handle hiding reviews
function hideReviews(event) {
  event.preventDefault();

  let article = this.closest('article');
  article.querySelector('.reviews').classList.add('hidden');

  this.classList.add('hidden');
  this.previousElementSibling.classList.remove('hidden');
}

// Function to handle form submission for adding reviews
function submitReview(event) {
  event.preventDefault(); 

  let form = this;
  let nick = form.querySelector('input[name=nickname]').value;
  let comment = form.querySelector('textarea[name=review]').value;

  let reviewList = form.closest('article').querySelector('dl');
  let dt = createReviewElement(nick, comment);

  reviewList.appendChild(dt.dtElement);
  reviewList.appendChild(dt.ddElement);

  form.querySelector('input[name=nickname]').value = '';
  form.querySelector('textarea').value = '';
}

// Function to create review elements
function createReviewElement(nick, comment) {
  let dt = document.createElement('dt');
  dt.textContent = nick + ' ';

  let deleteLink = document.createElement('a');
  deleteLink.href = '#';
  deleteLink.className = 'delete';
  deleteLink.textContent = '(delete)';
  deleteLink.addEventListener('click', deleteReview);

  dt.appendChild(deleteLink);

  let dd = document.createElement('dd');
  dd.textContent = comment;

  return { dtElement: dt, ddElement: dd };
}

// Function to handle deletion of reviews
function deleteReview(event) {
  event.preventDefault();

  let dt = this.parentElement;
  let dd = dt.nextElementSibling;

  dt.remove();
  if (dd && dd.tagName === 'DD') {
    dd.remove();
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a.show').forEach(link => {
    link.addEventListener('click', showReviews);
  });

  document.querySelectorAll('a.hide').forEach(link => {
    link.addEventListener('click', hideReviews);
  });

  document.querySelectorAll('form.add_review').forEach(form => {
    form.addEventListener('submit', submitReview);
  });

  // This click event listener is set for dynamic deletion links
  document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
      deleteReview.call(event.target, event);
    }
  });
});