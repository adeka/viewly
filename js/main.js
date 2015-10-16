var grid;

window.onload = function() {
//  createRandomPins(750);
//  initIsotope();
//  initPanZoom();
  initPinterestSDK();
  initPanZoom();
  boardLinks();
  centerFrame();

  setTimeout(function() {

        $('.panzoom').panzoom('zoom', 0.5, {
          focal: {
            clientX: -100,
            clientY: -100
          }
        });

  }, 3000);



}





boardLinks = function() {
  $('#boardSelect').on('change', function() {
    var url = '?board=' + $(this).val();
    if (url) {
      window.location = url;
    }
    return false;
  });
}

createView = function(w,h){
  var view = $('.container')
  view.width(w);
  view.height(h);
  view.css('width', w + 'px !important');
  view.css('height', h + 'px !important');
  //view.css("left", w*-.5);
  //view.css("top", w*-.5);
}

initIsotope = function () {
  /*
    grid = $('.container').isotope({
      layoutMode: 'packery',
      itemSelector: '.item',

    });


    grid.imagesLoaded().progress( function() {
      grid.isotope('layout');
    });
*/
    grid = $('.container').imagesLoaded( function() {
      grid.isotope({
        layoutMode: 'packery',
        itemSelector: '.item',

      });
    });



}



centerFrame = function() {

var $body = $('.container');
$body.on('mousedown', function (evt) {
  $body.on('mouseup mousemove', '.item', function handler(evt) {
    if (evt.type === 'mouseup') {
      // click
      console.log('click');

      $('.panzoom').panzoom('zoom', 1);
      var yOffset = $( window ).height() / 2;
      var xOffset = $( window ).width() / 2 ;
      var top = $(this).position().top;
      var left = $(this).position().left;

      var height = $(this).height();
      var width = $(this).width();
      var x = - left + xOffset - width/2;
      var y = - top + yOffset - height/2;

      $('.panzoom').panzoom('pan', x, y );
   //   $('.panzoom').panzoom('zoom');

      var scale = 1 * $( window ).height() / height;

      $('.panzoom').panzoom('zoom', scale, {
        focal: {
          clientX: xOffset,
          clientY: yOffset
        }
      });

    } else {
      // drag
      console.log('drag');
    }
    $body.off('mouseup mousemove', handler);
  });
});

/*
  $('.container').on('mouseup', '.item', function() {





  });
*/

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
      startTransform: 'scale(0.5)',
      focal: e
    });
  });


//$('.panzoom').panzoom('zoom', 0.7 );




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
    if(pins[i].image.original.height < 1000) {
      var url = pins[i].image.original.url;
      total += pins[i].image.original.height;
      sum += pins[i].image.original.height * pins[i].image.original.width;
      var board = pins[i].board.id;
      var div = $('<img class="item ' + board + '"></img>');
      div[0].src = url;
      div.css('background', pins[i].color);


      $('.container').append(div);
    }
  }


  //createView(total/Math.sqrt(pins.length));
  //createView(3000,1.5*Math.sqrt(sum));

  initIsotope();
//  createView(5000,5000);
  createView(1.33*Math.sqrt(sum),1.33*Math.sqrt(sum));



//  grid.isotope("layout");
//  grid.isotope('shuffle');
//  initPanZoom();

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
          board_param = getUrlParameter('board');
          console.log(board_param);

          if (!board_param) {
            getPins(session);
          }
          else {
            getBoard(session, board_param);

          }


          getBoards(session);
         // getBoard(session, '494059090310629393');
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

getBoards = function(session) {
  var boardArray = [];
  PDK.me('boards', {
    access_token: session.accessToken, // Change this
  },function(response) {
    if (!response || response.error) {
      alert('Error occurred');
    }
    else {
      var boards = response.data;
      $.each(boards, function(i) {
        $('#boardSelect')
          .append($("<option></option>")
          .attr('value', String(boards[i].id))
          .text(String(boards[i].name)));
      });

    }
  });
}

getBoard = function(session, board_id) {
  PDK.request('/boards/' + board_id + '/pins/', {
      access_token: session.accessToken, // Change this
      limit: 100,
      fields: 'id,creator,color,board,image[original,medium,large,small]'
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

getPins = function(session) {

  PDK.me('pins', {
      access_token: session.accessToken, // Change this
      limit: 100,
      fields: 'id,creator,color,board,image[original,medium,large,small]'
    }, function(response) {
    if (!response || response.error) {
      alert('Error occurred');
    } else {
      var pins = response.data;
      addPins(pins);
      console.log(pins);
    }

  });


// pagination
/*
  var pins = [];
  var counter = 0;
  PDK.request('/me/pins/', {
    access_token: session.accessToken,
    fields: 'id,creator,color,board,image[original,medium,large,small]'
  }, function (response) {

    if (!response || response.error) {
      alert('Error occurred');
    } else {
      pins = pins.concat(response.data);
      console.log(pins);
      counter += 1;

      if (response.hasNext && counter < 5) {
        response.next(); // this will recursively go to this same callback
      }

      if (!response.hasNext || counter >= 5) {

        addPins(pins);
        console.log(pins);
        console.log('done');

      }

    }

  });
*/



}

shuffle = function() {
  grid.isotope('shuffle');
  initPanZoom();
}

getUrlParameter = function(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
