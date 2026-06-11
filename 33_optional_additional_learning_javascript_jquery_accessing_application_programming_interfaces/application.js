// JSON data goes here

// Function to create HTML from JSON goes here

/**
 * Click event handler for the "Show reviews" links
 */
function show_reviews_click_handler(event) {
  event.preventDefault();
  var list_item = $(this).parent().parent();
  list_item.addClass('show-reviews');
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
  var form = $(this);
  var nick = form.find('input[name=nickname]');
  var comment = form.find('textarea');
  var review_list = $(this).parent().find('dl');
  var dt = $('<dt>' + nick.val() + ' <a href="#" class="delete">(delete)</a></dt>');
  dt.children('a.delete').on('click', delete_review_click_handler);
  review_list.append(dt);
  review_list.append('<dd>' + comment.val() + '</dd>');
  nick.val('');
  comment.val('');
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
  $('#status').html('Finished loading');
});
