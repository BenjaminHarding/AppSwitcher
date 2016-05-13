(function($,window) {

  $(document).ready(function() {

    var $target = $('.js-switcher-target'),
      targetVisibleClass = 'layout__switcher--visible',
      contentVisibleClass = 'switcher--visible',
      targetInvisibleClass = 'layout__switcher--hidden',
      $contentClass = $('.js-switcher-content');

    $('.js-switcher-toggle').click(function() {

      $target.toggleClass(targetVisibleClass);
      $contentClass.toggleClass(contentVisibleClass);
      $target.toggleClass(targetInvisibleClass);

    });

    $target.click(function(event) {
      $target.removeClass(targetVisibleClass);
      $contentClass.removeClass(contentVisibleClass);
      setTimeout(function() {
        $target.addClass(targetInvisibleClass);
      },200);
    });

    $contentClass.click(function(event) {
      event.stopPropagation();
    });

  });

})($,window);
