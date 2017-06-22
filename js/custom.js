// Show new link input on drowndown change
$('#dropdown').change(function() {
  var source = $(this).val();

  $('#newLinkItem').find('.chosen-link').text(source);
  $('#newLinkItem').show("fast");
});

// Save the new link and append to page
$('button').click(function() {
  console.log("link: save")
  console.log($('#dropdown').val());

  var source = $('#dropdown').val().toLowerCase();
  var $linkText = $('#basic-url');
  saveLink($linkText.val(), source);

  $($linkText).val(' ');
  $('#newLinkItem').hide("fast");
  
  const links = displayLink();
  console.log(links);
});
