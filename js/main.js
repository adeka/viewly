
window.onload = function() {
  (function() {
    var $section = $('#focal');
    var $panzoom = $section.find('.panzoom').panzoom();
    $panzoom.parent().on('mousewheel.focal', function( e ) {
      e.preventDefault();
      var delta = e.delta || e.originalEvent.wheelDelta;
      var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      $panzoom.panzoom('zoom', zoomOut, {
        increment: 0.2,
        animate: false,
        focal: e
      });
    });
  })();
};
