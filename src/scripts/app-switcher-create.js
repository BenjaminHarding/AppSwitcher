(function($,window) {

  window.AppSwitcher = window.AppSwitcher || {};

  window.AppSwitcher.createGroup = function() {

    var $newGroup = $( `<div class="application-group application-group--margin js-group">
      <div class="application-group__header">
        <div class="application-header">
          <div class="application-header__move">
            <div class="flat-icon icon--16 icon--move"></div>
          </div>
          <div class="application-header__name js-group-title">
            Group name
          </div>
          <div class="application-header__delete js-group-delete">
            <div class="flat-icon icon--16 icon--trash"></div>
          </div>
        </div>
      </div>
      <div class="application-group__applications">

        <div class="application-grid clearfix js-drag-app-group">

          <!-- empty -->
          <div class="application-grid__empty js-drag-group-empty">
              Drag applications into this group
          </div>

        </div>

      </div>
    </div>` );

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
