$(function() {
  // display all saved links
  displayLink().then(links => {
    for(link in links) {
      var linkBod = `<div id="a-link" class="link-container ${link}-container" href="${links[link]}" data-toggle="tooltip" data-placement="bottom" trigger="click" title="Link copied!"><div class="link-placeholder"><p><i class="fa fa-${link.toLowerCase()} fa-lg" aria-hidden="true"></i> ${link}</p><div id="${link}"class="float-right options"><i class="fa fa-trash-o" aria-hidden="true"></i></div></div><div class="link-bottom-container ${link}-bottom-container"><div class="copy-link-placeholder text-center"><p>Copy Link</p></div></div></div>`
      $('#body-container').append(linkBod);
    }
  });

  // // Show new link input on drowndown change
  $('#dropdown').change(function() {
    const source = $(this).val();
    $('#newLinkItem').find('.chosen-link').text(source);
    $('#newLinkItem').show("fast");
    $('#basic-url').focus();
  });

  // Save the new link and append to page
  $('button').click(function() {
    const source = $('#dropdown').val();
    const $linkText = $('#basic-url');

    if (source != 'Add Link: Source') {
      saveLink($linkText.val(), source);

      $($linkText).val('');
      $('#dropdown')[0].selectedIndex = 0;
      $('div').remove('#a-link');
      $('#newLinkItem').hide("fast");

      displayLink().then(links => {
        for(link in links) {
          var linkBod = `<div id="a-link" class="link-container ${link}-container" href="${links[link]}" data-toggle="tooltip" data-placement="bottom" trigger="click" title="Link copied!"><div class="link-placeholder"><p><i class="fa fa-${link.toLowerCase()} fa-lg" aria-hidden="true"></i> ${link}</p><div id="${link}"class="float-right options"><i class="fa fa-trash-o" aria-hidden="true"></i></div></div><div class="link-bottom-container ${link}-bottom-container"><div class="copy-link-placeholder text-center"><p>Copy Link</p></div></div></div>`
          $('#body-container').append(linkBod);
        }
      });
    }
  });

  // copy cards link when clicked
  $('#body-container').on('click', '#a-link', function() {
    $('[data-toggle="tooltip"]').tooltip('dispose');

    const $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(this).attr('href')).select();
    document.execCommand("copy");
    $temp.remove();

    $(this).tooltip('toggle');
  });

  // delete link on option click
  $('#body-container').on('click', '.options', function() {
    deleteLink($(this).attr('id'));
    $('div').remove('#a-link');

    displayLink().then(links => {
      for(link in links) {
        var linkBod = `<div id="a-link" class="link-container ${link}-container" href="${links[link]}" data-toggle="tooltip" data-placement="bottom" trigger="click" title="Link copied!"><div class="link-placeholder"><p><i class="fa fa-${link.toLowerCase()} fa-lg" aria-hidden="true"></i> ${link}</p><div id="${link}"class="float-right options"><i class="fa fa-trash-o" aria-hidden="true"></i></div></div><div class="link-bottom-container ${link}-bottom-container"><div class="copy-link-placeholder text-center"><p>Copy Link</p></div></div></div>`
        $('#body-container').append(linkBod);
      }
    });
  });
});
