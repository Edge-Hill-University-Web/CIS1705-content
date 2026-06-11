/**
 * Add a single review to the list
 */
function add_review(list, review) {
  var dt = $('<dt>' + review.nickname + ' <a href="#" class="delete">(delete)</a></dt>');
  dt.find('a.delete').on('click', delete_review_click_handler);
  list.append(dt);
  list.append('<dd>' + review.review + '</dd>');
}

/**
 * Load the reviews for a film
 */
function load_reviews(list_item) {
  $('#status').show();
  var list = list_item.find('dl');
  list.empty();
  var promise = $.ajax('https://teaching.computing.edgehill.ac.uk/cis1007/film-reviews/' + list_item.data('film-id'), {});
  promise.done(function(data) {
    for(var idx = 0; idx < data.length; idx++) {
      add_review(list, data[idx]);
    }
  });
  promise.always(function() {
    $('#status').hide();
  });
}

/**
 * Click event handler for the "Show reviews" links
 */
function show_reviews_click_handler(event) {
  event.preventDefault();
  var list_item = $(this).parent().parent();
  list_item.addClass('show-reviews');
  load_reviews(list_item);
}

/**
 * Click event handler for the "Hide reviews" links
 */
function hide_reviews_click_handler(event) {
  event.preventDefault();
  $(this).parent().parent().removeClass('show-reviews');
}

/**
 * Submit event handler for the "add a review" form.
 */
function add_review_submit_handler(event) {
  event.preventDefault();
  $('#status').show();
  var form = $(this);
  var list_item = form.parent().parent();
  var review_list = list_item.find('dl');
  form.find('input[type=text]').val('');
  form.find('textarea').val('');
}

/**
 * Click event handler for the "Delete" link for deleting a review
 */
function delete_review_click_handler(event) {
  event.preventDefault();
  var dt = $(this).parent();
  dt.next().remove();
  dt.remove();
}

/**
 * Setup the page's JavaScript on load
 */
$(document).on('ready', function() {
  $('a.show').on('click', show_reviews_click_handler);
  $('a.hide').on('click', hide_reviews_click_handler);
  $('form').on('submit', add_review_submit_handler);
  $('a.delete').on('click', delete_review_click_handler);
  $('#status').hide();
});
