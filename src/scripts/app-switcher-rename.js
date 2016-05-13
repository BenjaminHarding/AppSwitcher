(function($, window) {

  var addElementEvents = function(element) {

    $( element ).on("focus", onFocus);
    $( element ).on("blur", onBlur);
    $( element ).on('keydown', onKeyUp);

  };

  $(document).ready(function() {

    $('.js-group-title').attr('contenteditable', true).each(function(index,element) {
      addElementEvents( element );
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
