// Show new link input on drowndown change
$('#dropdown').change(function() {
  const source = $(this).val();

  $('#newLinkItem').find('.chosen-link').text(source);
  $('#newLinkItem').show("fast");
});

// Save the new link and append to page
$('button').click(function() {
  const source = $('#dropdown').val().toLowerCase();
  const $linkText = $('#basic-url');

  saveLink($linkText.val(), source);

  $($linkText).val(' ');
  $('#newLinkItem').hide("fast");

  displayLink().then(links => {
    for(link in links) {
      console.log(link + ": " + links[link]);
    }
  });
});
