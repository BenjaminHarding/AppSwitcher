(function($,window) {

  window.AppSwitcher = window.AppSwitcher || {};

  var deleteClass = '.js-group-delete';

  window.AppSwitcher.addDeleteEvents = function(element, findInside) {

    if( findInside ) {
      element = $(element).find(deleteClass);
    }

    $(element).click(deleteGroup);

  };

  deleteGroup = function() {

    var appClass = '.js-drag-app',
      $unGroupedGroup = $('.js-app-ungrouped .js-drag-app-group'),
      closestGroup = $(this).closest('.js-group');

    closestGroup.find(appClass).each(function(i,element) {
      $unGroupedGroup.append( element );
    });

    closestGroup.remove();

  };

  $(document).ready(function() {

    window.AppSwitcher.addDeleteEvents( $('.js-group-delete') );

  });

})($,window)
