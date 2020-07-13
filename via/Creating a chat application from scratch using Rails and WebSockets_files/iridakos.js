/*
 *  jquery.docout - v1.0.0
 *  jQuery plugin for producing document outline
 *  https://github.com/iridakos/jquery.docout#readme
 *
 *  Made by Lazarus Lazaridis
 *  Under MIT License
 */

;$(function() {
  $('[data-role="outline"]').docout();

  $('.page-content img, .maximize').not('.no-maximize').on('click', function() {
    $('#image-modal .image').attr('src', $(this).attr('src'));
    $('#image-modal .modal-title').html($(this).attr('alt'));
    $('#image-modal').modal('show');
  });

  var docCookie = document.cookie;

  if (docCookie && docCookie.length > 0) {
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
        var d = window.location.hostname.split(".");
        while (d.length > 0) {
            var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
            var p = location.pathname.split('/');
            document.cookie = cookieBase + '/';
            while (p.length > 0) {
                document.cookie = cookieBase + p.join('/');
                p.pop();
            };
            d.shift();
        }
    }
  }
});
