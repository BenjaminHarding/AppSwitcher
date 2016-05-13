(function($, window) {

  window.AppSwitcher = window.AppSwitcher || {};

  var dragElements = ['js-drag-app-group', 'js-drag-app'];

  window.AppSwitcher.addGroupDragEvents = function( element, findInside ) {

    if( findInside ) {
      element = $(element).find('.' + dragElements[0])[0];
    }

    element.addEventListener('dragenter', dragEvents.enter, false);
    element.addEventListener('dragleave', dragEvents.leave, false);
    element.addEventListener('dragover', dragEvents.over, false);
    element.addEventListener('drop', dragEvents.drop, false);
  };

  window.AppSwitcher.addAppDragEvents = function( element ) {

    element.addEventListener('dragstart', dragEvents.started, false);
    element.addEventListener('dragover', dragEvents.over, false);
    /*
    element.addEventListener('dragenter', dragEvents.enter, false);
    element.addEventListener('drop', dragEvents.drop, false);
    */
    element.addEventListener('dragend', dragEvents.end, false);
  };

  window.AppSwitcher.checkEmptyGroup = function(element) {

    //.js-drag-group-empty
    var $element = $(element);

    if( $element.find('.'+dragElements[1]).length >= 1 ) {
      $element.find('.js-drag-group-empty').remove();
      return;
    }

    if( $element.find('.js-drag-group-empty').length >= 1 ) {
      return;
    }

    var $emptyGroupElement = $('<div class="application-grid__empty js-drag-group-empty">Drag applications into this group</div>');

    $element.append( $emptyGroupElement );

  };

  $(document).ready(function() {

    // if (!window.Modernizr.draganddrop) {
    //   // Browser supports HTML5 DnD.
    // } else {
    //   // No native dnd support
    //   console.log('No drag support :(');
    //   return;
    // }

    // Apps
    $( '.' + dragElements[1] ).attr('draggable', true).each(function(index,element) {

      element.style.backgroundColor = `rgb( ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)}, ${Math.floor(Math.random()*255)} )`;

      window.AppSwitcher.addAppDragEvents( element );

    });

    // Groups
    $( '.' + dragElements[0] ).each(function(index,element) {

      window.AppSwitcher.addGroupDragEvents( element );

    });

  });

  // Dragging Classes
  var dragClasses = {
    dragging: 'application-grid__item--dragging',
    enter: 'application-grid--over'
  };

  // Drag Events
  var dragEvents = {
    currentElement: null,
    //Mouse offset
    currentElementMouseOffset: {
      x: 0,
      y: 0
    },
    started: function( event ) {
      dragEvents.currentElement = this;

      var offset = $( this ).offset();

      dragEvents.currentElementMouseOffset.x = offset.left - event.clientX;
      dragEvents.currentElementMouseOffset.y = offset.top - event.clientY;

      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setData('text/html', this.outerHTML);

      $(this).addClass( dragClasses.dragging );
    },

    end: function(event) {
      $(this).removeClass( dragClasses.dragging );
    },

    enter: function( event ) {
      $(this).addClass( dragClasses.enter );
    },

    over: function( event ) {
      if (event.preventDefault) {
        event.preventDefault();
      }
      event.dataTransfer.dropEffect = 'move';
      return false;
    },

    leave: function( event ) {
      $(this).removeClass( dragClasses.enter );
    },

    drop: function( event ) {
      if (event.stopPropagation) {
        event.stopPropagation();
      }

      if( dragEvents.currentElement !== this) {
        //Switch the element we dragged for this one
        //dragEvents.currentElement.innerHTML = this.innerHTML;
        var $currentTarget = $( dragEvents.currentElement ),
        $currentTargetParent = $currentTarget.closest( '.' + dragElements[0] );

        $currentTarget.remove();

        //Create element, add to dom, append elements
        var element = $( event.dataTransfer.getData('text/html') )[0],
          $container = $( this );

        var childLeft,
          childLeftOffset,
          mouseX = dragEvents.currentElementMouseOffset.x + event.clientX,
          mouseY = dragEvents.currentElementMouseOffset.y + event.clientY;

        $container.children('.' + dragElements[1]).each(function() {

          var $tempChild = $(this),
            offset = $tempChild.offset();

          if( !childLeft ) {
            childLeft = this;
            childLeftOffset = offset;
            return;
          }

          if( mouseX > offset.left && offset.left > childLeftOffset.left ) {
            childLeft = $tempChild[0];
            childLeftOffset = offset;
          }

          if( mouseY > offset.top && offset.top > childLeftOffset.top ) {
            childLeft = $tempChild[0]; //If the target is too far
            childLeftOffset = offset;
          }

        });


        if( childLeft ) {
          $( element ).insertAfter( childLeft );
        } else {
          $( element ).appendTo( $(this) );
        }

        window.AppSwitcher.checkEmptyGroup( $(element).closest( '.' + dragElements[0] ) );
        window.AppSwitcher.checkEmptyGroup( $currentTargetParent );
        window.AppSwitcher.addAppDragEvents( element );
      }

      $(this).removeClass( dragClasses.enter );
      //$currentTargetParent.removeClass( dragClasses.enter );

      return false;
    }
  };

})($, window);
