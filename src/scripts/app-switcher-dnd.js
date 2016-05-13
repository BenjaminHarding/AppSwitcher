(function($, window) {

  var dragElements = ['.js-drag-app-group', '.js-drag-app'];

  $(document).ready(function() {

    // if (!window.Modernizr.draganddrop) {
    //   // Browser supports HTML5 DnD.
    // } else {
    //   // No native dnd support
    //   console.log('No drag support :(');
    //   return;
    // }

    $( dragElements ).attr('draggable', true).each(function(index,element) {
      element.addEventListener('dragstart', dragStarted, false);
      element.addEventListener('dragenter', dragEnter, false);
      element.addEventListener('dragover', dragOver, false);
      element.addEventListener('dragleave', dragLeave, false);
      element.addEventListener('drop', dragDrop, false);
      element.addEventListener('dragend', dragEnd, false);
    });

  });

  var dragClasses = {
    dragging: 'app-switcher-app--dragging'
  };

  var dragEvents = {
    currentElement = null,
    started: function( event ) {

      dragEvents.currentElement = this;
      $(this).addClass( dragClasses.dragging );

      event.dataTransfer.effectAllowed = 'move';  // Restricts the type of drag the user can make
      event.dataTransfer.setData('text/html', this.innerHTML);

    },
    enter: function( event ) {

    },
    over: function( event ) {

    },
    leave: function( event ) {

    },
    drop: function( event ) {

    }
  };

  var dragStarted = function(event) {

    $(event.currentTarget).addClass('app-switcher-app--dragging');

    dragElement = this;
    //set the data & effect
    event.dataTransfer.effectAllowed = 'move';  //restricts the type of drag the user can make
    event.dataTransfer.setData('text/html', this.innerHTML);
  };

  var dragEnter = function(event) {

    $(event.currentTarget).addClass('app-switcher-app--drag-over');

  };

  var dragOver = function(event) {
    if (event.preventDefault) {
      event.preventDefault(); // Necessary. Allows us to drop.
    }

    event.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;

  };

  var dragLeave = function(event) {

    $(event.currentTarget).removeClass('app-switcher-app--drag-over');

  };

  var dragDrop = function(event) {
    if (event.stopPropagation) {
      event.stopPropagation(); // stops the browser from redirecting.
    }

    //Id the elements match
    if( dragElement !== this) {
      //Switch the element we dragged for this one
      dragElement.innerHTML = this.innerHTML;
      this.innerHTML = event.dataTransfer.getData('text/html');
    }

    $(this).removeClass('app-switcher-app--drag-over');

    return false;
  };

  var dragEnd = function(event) {

    $(event.currentTarget).removeClass('app-switcher-app--dragging');

  };

})($, window);
