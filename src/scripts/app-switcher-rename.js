(function($, window) {

  window.AppSwitcher = window.AppSwitcher || {};

  var titleClass = '.js-group-title';

  window.AppSwitcher.addElementEvents = function(element, findInside) {

    if( findInside ) {
      element = $(element).find(titleClass);
    }

    $(element).attr('contenteditable', true)
      .on("focus", onFocus)
      .on("blur", onBlur)
      .on('keydown', onKeyUp);

  };

  $(document).ready(function() {

    $(titleClass).each(function(index,element) {
      window.AppSwitcher.addElementEvents( element );
    });

  });

  var onFocus = function() {

  };

  var onBlur = function() {

  };

  var onKeyUp = function(event) {
    if (event.which == 13 && event.shiftKey == false) {
      $(this).blur();
      return false;
    }
  };


})($, window);
