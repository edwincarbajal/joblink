$(function() {
  // Show new link input on drowndown change
  $('#dropdown').change(function() {
    var source = $(this).val();

    $('#newLinkItem').find('.chosen-link').text(source);
    $('#newLinkItem').show("fast");
  });

  // Save the new link and append to page
  $('button').click(function() {
    $('#newLinkItem').hide("fast");
  });
})
