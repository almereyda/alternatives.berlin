/*jslint browser: true*/
/*global Tangram, gui */

var map = (function () {
    'use strict';

    var locations = {
        'Mellow Park': [52.455391527403584, 13.563791973750744, 17.574999999999985]
    };

    var map_start_location = locations['Mellow Park'];

    /*** Map ***/

    var map = L.map('map',{
      "scrollWheelZoom" : 'center',
      "doubleClickZoom" : 'center',
      "boxZoom" : false,
      "keyboard" : false,
      "dragging" : false
      }
    );

    var layer = Tangram.leafletLayer({
        scene: 'scene.yaml',
        numWorkers: 2,
        attribution: '<a href="https://mapzen.com/tangram" target="_blank">Tangram</a> | <a href="http://cartodb.github.io/odyssey.js/" target="_blank">Odyssey</a> | &copy; OSM contributors | <a href="https://github.com/almereyda/alternatives.berlin/" target=_blank><i class="icon ion-social-github"></i></a> | <a href="https://almereyda.de/" target="_blank">Jon Richter</a>',
        unloadInvisibleTiles: false,
        updateWhenIdle: false
    });

    window.layer = layer;
    var scene = layer.scene;
    window.scene = scene;

    // setView expects format ([lat, long], zoom)
    map.setView(map_start_location.slice(0, 3), map_start_location[2]);

    /***** Render loop *****/

    window.addEventListener('load', function () {
        // Scene initialized
        layer.on('init', function() {
        });
        layer.addTo(map);
    });

    return map;

}());

function click(el) {
  var element = O.Core.getElement(el);
  var t = O.Trigger();

  function click() {
    t.trigger();
  }

  if (element) element.onclick = click;

  return t;
};

// md_template alternative via http://bl.ocks.org/anonymous/b0b6ecf496e4e83db62b
var mellowpark = (function() {
  L.AwesomeMarkers.Icon.prototype.options.prefix = 'ion';

  var party = L.AwesomeMarkers.icon({
    icon: 'transgender',
    markerColor: 'darkpurple'
  });

  var buffet = L.AwesomeMarkers.icon({
    icon: 'wineglass',
    markerColor: 'purple'
  });

  var train = L.AwesomeMarkers.icon({
    icon: 'android-train',
    markerColor: 'green'
  });

  var Wege = {
      "color": "#ff7800",
      "weight": 10,
      "opacity": 0.65
  };


  var Zuwegung = new L.geoJson.ajax("zuwegung.geojson", {style:Wege, interactive: false})
    .addTo(map);

  var MellowPark = new L.Marker([52.4553578, 13.5638567], {icon: party, interactive: false});
  MellowPark.addTo(map);

  var Pavillion = new L.Marker([52.4551566, 13.5633669], {icon: buffet, interactive: false});
  Pavillion.addTo(map);

  var Spindlersfeld = new L.Marker([52.4468902, 13.5615362], {icon: train, interactive: false})
    .addTo(map);

  var Koepenick = new L.Marker([52.458577, 13.5815192], {icon: train, interactive: false})
    .addTo(map);

  var seq = O.Triggers.Sequential();
  // enanle keys to move
  O.Triggers.Keys().left().then(seq.prev, seq)
  O.Triggers.Keys().right().then(seq.next, seq)

  click(document.querySelectorAll('.next')).then(seq.next, seq)
  click(document.querySelectorAll('.prev')).then(seq.prev, seq)

  var slides = O.Actions.Slides('slides');
  var progress = O.UI.DotProgress('dots').count(2);

    var story = O.Story()
    .addState(
      seq.step(0),
      O.Parallel(
        map.actions.setView(MellowPark.getLatLng(), 17),
        slides.activate(0),
        progress.activate(0)
      )
    )
    .addState(
      seq.step(1),
      O.Parallel(
        map.actions.setView(Pavillion.getLatLng(), 19),
        slides.activate(1),
        progress.activate(1)
      )
    )
    .addState(
      seq.step(2),
      O.Parallel(
        map.actions.setView(MellowPark.getLatLng(), 16),
        slides.activate(2),
        progress.activate(2)
      )
    )
    .addState(
      seq.step(3),
      O.Parallel(
        map.actions.panTo(Spindlersfeld.getLatLng(), {duration: 1}),
        slides.activate(3),
        progress.activate(3)
      )
    )
    .addState(
      seq.step(4),
      O.Parallel(
        map.actions.panTo(Koepenick.getLatLng(), {duration: 1}),
        slides.activate(4),
        progress.activate(4)
      )
    )
    .addState(
      seq.step(5),
      O.Parallel(
        map.actions.setView([52.4530558, 13.5715072], 15.5),
        slides.activate(5),
        progress.activate(5)
      )
    )
    .addState(
      progress.step(0),
      O.Parallel(
        map.actions.setView(MellowPark.getLatLng(), 17),
        slides.activate(0),
        progress.activate(0)
      )
    )
    .addState(
      progress.step(1),
      O.Parallel(
        map.actions.setView(Pavillion.getLatLng(), 19),
        slides.activate(1),
        progress.activate(1)
      )
    )
    .addState(
      progress.step(2),
      O.Parallel(
        map.actions.setView(MellowPark.getLatLng(), 16),
        slides.activate(2),
        progress.activate(2)
      )
    )
    .addState(
      progress.step(3),
      O.Parallel(
        map.actions.panTo(Spindlersfeld.getLatLng(), {duration: 1}),
        slides.activate(3),
        progress.activate(3)
      )
    )
    .addState(
      progress.step(4),
      O.Parallel(
        map.actions.panTo(Koepenick.getLatLng(), {duration: 1}),
        slides.activate(4),
        progress.activate(4)
      )
    )
    .addState(
      progress.step(5),
      O.Parallel(
        map.actions.setView([52.4530558, 13.5715072], 15.5),
        slides.activate(5),
        progress.activate(5)
      )
    )
  story.go(0);

}());
