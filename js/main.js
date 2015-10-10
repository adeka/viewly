var grid;

window.onload = function() {
  createRandomPins(400);
  initIsotope();
  initPanZoom();
}

createView = function(scale){
  var view = $('.container')
  var w = 1920*scale;
  var h = 1080*scale;
  view.width(w);
  view.height(h);
  view.css("left", w*-.5);
  view.css("top", h*-.5);
}

initIsotope = function () {
    grid = $('.container').isotope({
      layoutMode: 'packery',
      itemSelector: '.item',
      packery: {
        containerStyle: null
  }
});

}

initPanZoom = function() {
  var $section = $('#focal');
  var $panzoom = $section.find('.panzoom').panzoom();
  $panzoom.parent().on('mousewheel.focal', function( e ) {
    e.preventDefault();
    var delta = e.delta || e.originalEvent.wheelDelta;
    var zoomOut = delta ? delta < 0 : e.originalEvent.deltaY > 0;
    $panzoom.panzoom('zoom', zoomOut, {
      increment: 0.2,
      animate: false,
      minScale: 0.1,
      maxScale: 5,
      focal: e
    });
  });
}

createRandomPins = function(n) {
  for (var i=0; i<n; i++) {
    var div = $('<div class="item"></div>');
    div.width(Math.random() * 500);
    div.height(Math.random() * 500);
    $('.container').append(div);
  }
}
