$(function() {
  getDarkMode().then(item => {
    if (item) {
      $('#dark-mode-slide').prop('checked', true);
      $('.list-group-item').addClass('dark_mode');
      $('body').addClass('dark_mode');
      $('#dropdown').addClass('dark_mode');
      $('.nav-link').addClass('dark_nav');
      $('.add-link-button').addClass('dark_button');
    };
  });

  $('.tab-pane').on('click', '.slider', function() {
    getDarkMode().then(item => {
      if (item) {
        setDarkMode(false);
        $('#dark-mode-slide').prop('unchecked', true);
        $('.list-group-item').removeClass('dark_mode');
        $('body').removeClass('dark_mode');
        $('#dropdown').removeClass('dark_mode');
        $('.nav-link').removeClass('dark_nav');
        $('.add-link-button').removeClass('dark_button');
      } else {
        setDarkMode(true);
        $('#dark-mode-slide').prop('checked', true);
        $('.list-group-item').addClass('dark_mode');
        $('body').addClass('dark_mode');
        $('#dropdown').addClass('dark_mode');
        $('.nav-link').addClass('dark_nav');
        $('.add-link-button').addClass('dark_button');
      }
    });

  });

  $('body').on('click', '.settings-url', function() {
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });

  // display all saved links
  displayLink().then(links => {
    for(link in links) {
      if (link !== 'dark_mode') {
        var linkBod = `<div id="a-link" class="link-container ${link}-container" href="${links[link]}" data-toggle="tooltip" data-placement="bottom" trigger="click" title="Link copied!"><div class="link-placeholder"><p><i class="fa fa-${link === 'Portfolio' ? 'briefcase' : link.toLowerCase()} fa-lg" aria-hidden="true"></i> ${link === 'Portfolio' ? 'Portfolio' : link}</p><div id="${link}"class="float-right options"><i class="fa fa-trash-o" aria-hidden="true"></i></div></div><div class="link-bottom-container ${link}-bottom-container"><div class="copy-link-placeholder text-center"><p>Copy Link</p></div></div></div>`
        $('#body-container').append(linkBod);
      }
    }
  });

  // // Show new link input on drowndown change
  $('#dropdown').change(function() {
    const source = $(this).val();
    $('#newLinkItem').find('.chosen-link').text(source);
    $('#newLinkItem').show("fast");
    $('.add-link-button').removeAttr('disabled');
    $('.add-link-button').removeClass('disabled_button');
    $('#basic-url').focus();
  });

  // Save the new link and append to page
  $('.add-link-button').click(function() {
    const source = $('#dropdown').val();
    const $linkText = $('#basic-url');

    if(source != 'Add Link: Source') {
      if($linkText.val() != '') {
        saveLink($linkText.val(), source);

        $($linkText).val('');
        $('#dropdown')[0].selectedIndex = 0;
        $('div').remove('#a-link');
        $('#newLinkItem').hide("fast");

        displayLink().then(links => {
          for(link in links) {
            if (link !== 'dark_mode') {
              var linkBod = `<div id="a-link" class="link-container ${link}-container" href="${links[link]}" data-toggle="tooltip" data-placement="bottom" trigger="click" title="Link copied!"><div class="link-placeholder"><p><i class="fa fa-${link === 'Portfolio' ? 'briefcase' : link.toLowerCase()} fa-lg" aria-hidden="true"></i> ${link === 'Portfolio' ? 'Portfolio' : link}</p><div id="${link}"class="float-right options"><i class="fa fa-trash-o" aria-hidden="true"></i></div></div><div class="link-bottom-container ${link}-bottom-container"><div class="copy-link-placeholder text-center"><p>Copy Link</p></div></div></div>`
              $('#body-container').append(linkBod);
            }
          }
        });
        $('.add-link-button').attr('disabled', 'disabled');
        $('.add-link-button').addClass('disabled_button');
      }
    }
    $('.add-link-button').attr('disabled', 'disabled');
    $('.add-link-button').addClass('disabled_button');
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
        if (link !== 'dark_mode') {
          var linkBod = `<div id="a-link" class="link-container ${link}-container" href="${links[link]}" data-toggle="tooltip" data-placement="bottom" trigger="click" title="Link copied!"><div class="link-placeholder"><p><i class="fa fa-${link === 'Portfolio' ? 'briefcase' : link.toLowerCase()} fa-lg" aria-hidden="true"></i> ${link === 'Portfolio' ? 'Portfolio' : link}</p><div id="${link}"class="float-right options"><i class="fa fa-trash-o" aria-hidden="true"></i></div></div><div class="link-bottom-container ${link}-bottom-container"><div class="copy-link-placeholder text-center"><p>Copy Link</p></div></div></div>`
          $('#body-container').append(linkBod);
        }
      }
    });
  });
});
