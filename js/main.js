
window.onload = function() {

  ( function() {
    var container = document.querySelector('#center-out1');
    // appendRandomSizedItems( container );
    // appendRandomSizedItems( container );
    var pckry = new Packery( container, {
      // gutter: 10,
      itemSelector: '.item',
      centered: {
       x: 10000,
       y: 10000
      }
    });

    eventie.bind( container, 'click', function() {
      pckry.layout();
      /*
      var elem = event.target;
      if ( !matchesSelector( elem, '.item' ) ) {
        return;
      }

      pckry.remove( elem );
      pckry.layout();
      */
    });

    function appendItem(topic) {
      (function() {
        var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON( flickerAPI, {
          tags: topic,
          tagmode: "any",
          format: "json",
        })
          .done(function( data ) {
            $.each( data.items, function( i, photo ) {
              //var item = $( "<img src="+item.media.m+"></img>");
              var item = document.createElement('img');
              item.className = 'item';
              var url = photo.media.m;
              var full = url.substring(0, url.length - 6) + ".jpg";
              item.src = full;
              /*
              var w = Math.floor( Math.random() * Math.random() * 100 ) + 20;
              var h = Math.floor( Math.random() * Math.random() * 100 ) + 20;
              item.style.width  = w + 'px';
              item.style.height = h + 'px';
              */

              container.appendChild( item );
              pckry.appended( item );
              //console.log(pckry);

            });
          });
      })();
    }

    /*
    itemCount = 0;
    function autoAppend() {
      appendItem();
      if ( itemCount++ < 500 ) {
        setTimeout( autoAppend, 2 );
      }
    }
    autoAppend();
    */

    appendItem("bird");

    setTimeout(appendItem("dog"), 0);
    setTimeout(appendItem("cat"), 0);
    setTimeout(appendItem("fish"), 0);
    setTimeout(appendItem("frog"), 0);
    setTimeout(appendItem("snake"), 0);
    setTimeout(appendItem("scorpion"), 0);



    //eventie.bind( document.querySelector('#add'), 'click',  appendItem );
  })();
};
