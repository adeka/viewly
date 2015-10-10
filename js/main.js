var grid;

window.onload = function() {
//  createRandomPins(750);
//  initIsotope();
//  initPanZoom();
  initPinterestSDK();
}

createView = function(w,h){
  var view = $('.container')
  view.width(w);
  view.height(h);
  //view.css("left", w*-.5);
  //view.css("top", w*-.5);
}

initIsotope = function () {
    grid = $('.container').isotope({
      layoutMode: 'packery',
      itemSelector: '.item',
      packery: {

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
      increment: 0.1,
      animate: false,
      minScale: 0.07,
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

addPins = function(pins) {
  var total =0;
  var sum = 0;
  for (var i=0; i<pins.length; i++) {
    var url = pins[i].image.original.url;
    total += pins[i].image.original.height;
    sum += pins[i].image.original.height * pins[i].image.original.width;
    var div = $('<img class="item"></img>');
    div[0].src = url;
    $('.container').append(div);
  }

  initIsotope();
  //createView(total/Math.sqrt(pins.length));
  //createView(1.33*Math.sqrt(sum));
  createView(18000,2000);
  console.log(total);
  grid.isotope("layout");
  initPanZoom();

}

initPinterestSDK = function() {
  window.pAsyncInit = function() {
      PDK.init({
          appId: "4794481293328913447", // Change this
          cookie: true
      });

      var session = JSON.parse(localStorage.getItem('session'));
      console.log(session);

      PDK.setSession(session, function(response) {
        if (!response || !response.session) {
          alert('Session was not set. Please log in.');
        } else {
          // session has been set
          console.log('session set');
          getPins(session);
        }
      })


  };

  (function(d, s, id){
      var js, pjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//assets.pinterest.com/sdk/sdk.js";
      pjs.parentNode.insertBefore(js, pjs);
  }(document, 'script', 'pinterest-jssdk'));

}

pinterestLogin = function() {
  PDK.login({scope : 'read_public, write_public'}, function(session) {
    if (!session) {
      alert('The user chose not to grant permissions or closed the pop-up');
    } else {
      console.log('Thanks for authenticating. Getting your information...');
      PDK.me(function(response) {
        if (!response || response.error) {
          alert('Oops, there was a problem getting your information');
        } else {
          console.log('Welcome,  ' + response.data.first_name + '!');
          pinterestLoginSuccess();
        }
      });
    }
  });

}

pinterestLoginSuccess = function() {
  var session = PDK.getSession();
  if (!session) {
    alert('No session has been set.');
  } else {
    // save session to server
    localStorage.setItem('session', JSON.stringify(session));
  }
  getPins(session);
}

getPins = function(session) {

  PDK.me('pins', {
      access_token: session.accessToken, // Change this
      limit: 100,
      fields: 'id,creator,color,image[original,medium,large,small]'
    }, function(response) {
    if (!response || response.error) {
      alert('Error occurred');
    } else {
      var pins = response.data;
      addPins(pins);
      console.log(pins);
    }
  });

}
