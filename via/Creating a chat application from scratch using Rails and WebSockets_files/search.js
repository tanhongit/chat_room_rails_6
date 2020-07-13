$(function() {
  var searchConfiguration = $('[data-role="tags-configuration"]');

  var htmlDecode = function (input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  var getUrlParameter = function getUrlParameter(sParam) {
    var input = window.location.search.substring(1).replace(/\+/, ' ');
    var sPageURL = decodeURIComponent(input),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  var fetchResults = function(query) {
    if (window.searchData != undefined) {
      searchData(query);
    } else {
      var feed_url = searchConfiguration.data('feed-url');
      $.getJSON(feed_url, function(data) {
        window.searchData = data;
        searchData(query);
      });
    }
  };

  var searchData = function(query) {
    var terms = query.split(' ').join('|'),
        regex = new RegExp(terms, 'i'),
        $results = $('.search-results');

    $results.html('');

    $.each(window.searchData, function(a,b){
      var target = [b.title, b.description, b.tags, b.categories, b.tutorials].join(' ');
      var match = target.match(regex);

      if (match != null) {
        createResult(b);
      }
    });
  };

  var createResult = function (searchResult) {
    var $results = $('.search-results');

    var $container = $('<div class="post"></div>'),
    $title = $('<div class="post-title"></div>'),
    $link = $('<a href="' + searchResult.url + '">' + searchResult.title + '</a>')
    $meta = $('<div class="post-metadata"><div class="post-date" title="published on">' + searchResult.date + '</div> @ <div class="post-category" title="at category">' + searchResult.categories + '</div></div>'),
    $preview = $('<div class="post-preview">' + htmlDecode(searchResult.description) + '</div>');

    if (searchResult.tags.length > 0) {
      var tagsContainer = $('<div class="post-tags"></div>');
      tagsContainer.append($('<span class="important">tags: </span>'));

      $.each(searchResult.tags, function(i, tag) {
        tagsContainer.append($('<a href="/tags/?tag='+ tag + '" class="" >' + tag + '</a>'));
        if (i < searchResult.tags.length - 1) {
          tagsContainer.append("<span> - </span>");
        }
      });

      $preview.append(tagsContainer);
    }

    $container.append($meta).append($title.append($link)).append($preview);
    $results.append($container);
    $results.append($('<hr class="separator">'));
  }

  var query = getUrlParameter('query'),
      $searchButton = $('#search_button'),
      $searchForm =$('#search_form');

  $searchForm.on('submit', function(evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();

    var $self = $(this),
    $searchField = $('#search_field');

    window.searchData = undefined;

    if ($searchField.val()) {
      var q = $.trim($searchField.val());

      window.history.pushState("Search submit", "This is a new title", "/search?query=" + encodeURIComponent(q));
      fetchResults(q);
      $searchField.val(q);
    }
  });

  if (query != undefined) {
    $('#search_field').val(query);

    fetchResults(query);
  };
});
