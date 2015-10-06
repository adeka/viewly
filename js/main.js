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


    var item = document.createElement('img');
    item.className = 'item';
    var url = 'http://assets.worldwildlife.org/photos/946/images/story_full_width/forests-why-matter_63516847.jpg?1345534028';
    item.src = url;
    container.appendChild( item );
    pckry.appended( item );


      var access_token = 'xxx';
      console.log('ready');

      var getUrlParameter = function getUrlParameter(sParam) {
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

      var code = getUrlParameter('code');

      function getToken(data) {
        access_token = data.access_token;
      }

      $.post("https://api.pinterest.com/v1/oauth/token", { grant_type : 'authorization_code', client_id : '4794481293328913447', client_secret : 'e7b4b8eeccd9e8f247d1c4cce90587a49c53f6333f7290a9ad4c5f17510064d1', code : code })
        .done(function( data ) {
       //   console.log( data.access_token );
          access_token = data.access_token;

          $.get("https://api.pinterest.com/v1/me/?access_token=" + access_token, function(data) {
            console.log('real data');
            console.log(data);
            console.log(data.data.first_name);
            $("div.name").html(data.data.first_name);
          });


          $.get("https://api.pinterest.com/v1/me/pins/?access_token=" + access_token + "&fields=id,creator,image[original,small]", function(data) {
            console.log('real data');
            console.log(data);

            for (var i = 0; i < data.data.length; i++) {
              var pin_url = data.data[i].image.original.url;
              var item = document.createElement('img');
              item.className = 'item';
              var url = pin_url;
              item.src = url;
              container.appendChild( item );
              pckry.appended( item );

            }

       //     console.log(data.data[0].image.original.url);
        //    var pin_url = data.data[0].image.original.url;




          });


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
            console.log(data);
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
/*
    $.ajax({
        type: "GET",
        url: "/js/nouns.txt",
        dataType: "text",
        success: function(data) {processData(data);}
     });

processData('flower');
processData('sunset');
processData('waterfall');
processData('ocean');
processData('rose');
*/
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
