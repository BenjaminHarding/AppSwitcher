(function($,window) {

  window.AppSwitcher = window.AppSwitcher || {};

  window.AppSwitcher.createGroup = function() {

    var $newGroup = $( '<div class="app-group js-group"><div class="app-group__heading"><h2 class="js-group-title">Untitled</h2><button class="js-group-delete">Delete group</button></div><div class="app-group__content js-drag-app-group"></div></div>' );

    // newGroup
    $newGroup.insertBefore( $( '.js-app-ungrouped' ) );
    window.AppSwitcher.addGroupDragEvents( $newGroup[0], true );
    window.AppSwitcher.addElementEvents( $newGroup[0], true );
    window.AppSwitcher.addDeleteEvents( $newGroup[0], true );

  };

  //js-create-group
  $(document).ready(function() {

    $('.js-create-group').click(window.AppSwitcher.createGroup);

  });

})($, window);
