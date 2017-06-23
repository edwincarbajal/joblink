$(function() {
  // display all saved links
  displayLink().then(links => {
    for(link in links) {
      var linkBod = `<div id="a-link" class="link-container ${link}-container"><div class="link-placeholder"><p>${link}</p>
    </div><div class="link-bottom-container ${link}-bottom-container"><div class="copy-link-placeholder text-center"><p>Copy Link</p></div></div></div>`
      $('#body-container').append(linkBod);
    }
  });

  // // Show new link input on drowndown change
  $('#dropdown').change(function() {
    const source = $(this).val();
    $('#newLinkItem').find('.chosen-link').text(source);
    $('#newLinkItem').addClass(`${source}-container`);
    $('#newLinkItem').show("fast");
  });


  // Save the new link and append to page
  $('button').click(function() {
    const source = $('#dropdown').val();
    const $linkText = $('#basic-url');

    saveLink($linkText.val(), source);

    $($linkText).val(' ');
    $('#dropdown')[0].selectedIndex = 0;
    $('div').remove('#a-link');
    $('#newLinkItem').hide("fast");

    displayLink().then(links => {
      for(link in links) {
        var linkBod = `<div id="a-link" class="link-container ${link}-container"><div class="link-placeholder"><p>${link}</p>
      </div><div class="link-bottom-container ${link}-bottom-container"><div class="copy-link-placeholder text-center"><p>Copy Link</p></div></div></div>`
        $('#body-container').append(linkBod);
      }
    });
  });




});
