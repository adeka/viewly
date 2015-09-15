var timer = 0;
window.onload = function() {

  ( function() {
    var container = document.querySelector('#center-out1');
    // appendRandomSizedItems( container );
    // appendRandomSizedItems( container );
    var pckry = new Packery( container, {
       gutter: 0,
      itemSelector: '.item',
      centered: {
       x: 10000,
       y: 10000
      }
    });

    console.log();

    eventie.bind( container, 'click', function(){
      //pckry.packer.center.x = 15000;
      //pckry.reloadItems();

      //pckry.layout();

      var elem = event.target;
      if ( !matchesSelector( elem, '.item' ) ) {
        return;
      }
      var x = $(elem).context.style.left;
      var y = $(elem).context.style.top;
      console.log();
      pckry.fit( elem, x, y )
      //pckry.layoutItems( elem, true );
      //pckry.remove( elem );
       pckry.layout();

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
              //var full = url;
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

    /*
    appendItem("bird");
    setTimeout(appendItem("dog"), 0);
    setTimeout(appendItem("cat"), 0);
    setTimeout(appendItem("fish"), 0);
    setTimeout(appendItem("frog"), 0);
    setTimeout(appendItem("snake"), 0);
    setTimeout(appendItem("scorpion"), 0);
    setTimeout(appendItem("mountains"), 0);
    setTimeout(appendItem("underwater"), 0);
    setTimeout(appendItem("caves"), 0);
    setTimeout(appendItem("underwater caves"), 0);
    setTimeout(appendItem("shooting stars"), 0);
    setTimeout(appendItem("meteorites"), 0);
    setTimeout(appendItem("asteroid"), 0);
    */

    $.ajax({
        type: "GET",
        url: "js/nouns.txt",
        dataType: "text",
        success: function(data) {processData(data);}
     });


    function processData(allText) {
        var allTextLines = allText.split(/\r\n|\n/);
        var nouns = allTextLines[0].split(',');
        for(var i=0;i<1;i++){
          var r = nouns[Math.floor(nouns.length * Math.random())];
          appendItem(r);
          console.log(r);
        }
      }




    //eventie.bind( document.querySelector('#add'), 'click',  appendItem );
  })();
};
