$(document).on('ready', function() {
  $('a.show').on('click', function(event) {
    event.preventDefault();
    var link = $(this);
    var list_item = link.parent().parent();
    var reviews = list_item.find('.reviews');
    reviews.show();
    $(this).siblings().show();
    $(this).hide();
  });
  $('a.hide').on('click', function(ev) {
    ev.preventDefault();
    $(this).parent().parent().find('.reviews').hide();
    $(this).siblings().show();
    $(this).hide();
  });
  $('form').on('submit', function(event) {
    event.preventDefault();
    var form = $(this);
    var nick = form.find('input[name=nickname]');
    var comment = form.find('textarea');
    alert(nick.val() + ' says: ' + comment.val());
  });
});
