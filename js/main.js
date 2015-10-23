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
       x: 20000,
       y: 20000
      }
    });

    var image_array = [];
/*
  $center-out1.find('.item').each( function( i, itemElem ) {
    // make element draggable with Draggabilly
    var draggie = new Draggabilly( itemElem );
    // bind Draggabilly events to Packery
    $container.packery( 'bindDraggabillyEvents', draggie );
  });
*/

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
   //   pckry.fit( elem, x, y )
      //pckry.layoutItems( elem, true );
      //pckry.remove( elem );


    });


    $('body').keyup(function(e){
       if(e.keyCode == 8){

       }
       if(e.keyCode == 32){
          pckry.layout();
       }
    });


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

      function getImages(url, n) {

        if ((url != "" || url != null) && n < 12) {
          $.get(url, function(data) {
            console.log(data);


            for (var i = 0; i < data.data.length; i++) {
              var pin_url = data.data[i].image.original.url;


              var item2 = document.createElement('img');
              item2.className = 'item2';
              var url = pin_url;
              item2.src = url;
              image_array.push(item2);
            // $("#hidden-images").appendChild( item2 );


              var item = document.createElement('canvas');
              item.className = 'item';
              item.style.background = data.data[i].color;
              var cv = item;
              var ctx = cv.getContext('2d');
              var w = data.data[i].image.original.width;
              var h = data.data[i].image.original.height;
              var p = w / 20;
              var q = h / 20;

              cv.width = p;
              cv.height = q;
              cv.style.width = w + "px";
              cv.style.height = h = "px";

              container.appendChild( item );
              pckry.appended( item );

            }

            console.log(image_array);
            n++;
            getImages(data.page.next, n);


          });
        } else {

          console.log(image_array);
          imagesLoaded( image_array, function() {

            for (var i = 0; i < image_array.length; i++) {

              var p = $('.container').children()[i].width;
              var q = $('.container').children()[i].height;
              var cv = $('.container').children()[i];
              var ctx = cv.getContext('2d');
              ctx.drawImage(image_array[i], 0, 0, p, q);
              console.log(i);
             // ctx.drawImage(item2, 0, 0, p, q);
             // console.log(item2);


    /*
              var item = document.createElement('img');
              item.className = 'item';
              var url = pin_url;
              item.src = url;
              item.style.background = data.data[i].color;
*/


            }

          });

          pckry.layout();




        }
      }

      function getBackgrounds(url, n) {
        if ((url != "" || url != null) && n < 4) {
          $.get(url, function(data) {
            console.log(data);

            for (var i = 0; i < data.data.length; i++) {
              var item = document.createElement('div');
              item.className = 'item';
              item.style.background = data.data[i].color;
              item.style.width = data.data[i].image.original.width + 'px';
              item.style.height = data.data[i].image.original.height + 'px';
              container.appendChild( item );
              pckry.appended( item );

            }
            n++;
            getBackgrounds(data.page.next, n);


          });
        } else {
          pckry.layout();
        }
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


          var initial_url = "https://api.pinterest.com/v1/me/pins/?access_token=" + access_token + "&fields=id,creator,color,image[original,medium,large,small]";
       //   getImages(initial_url, 0);
          getImages(initial_url, 0);

/*
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
            var next_url = data.page.next;










          });

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
