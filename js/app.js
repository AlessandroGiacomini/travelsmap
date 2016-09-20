'use strict';


// MODEL
var life = [
        ['Sydney', -33.890542, 151.274856, 'Sydney, Nuovo Galles del Sud'],
        ['Rome', 41.90278, 12.49637, 'Colosseo, Rome, Italy'],
        ['New York', 40.70651, -74.00556, 'New York, NY, Stati Uniti']
];

var travels = [
        ['Parigi', 48.855478, 2.346169, 'Parigi, Francia'],
        ['Londra', 51.507362, -0.127695, 'Londra, Regno Unito'],
        ['Madrid', 40.416603, -3.703821, 'Madrid, Spagna'],
        ['Zambrone', 38.69789, 15.99180, 'Zambrone VV, Italia'],
        ['Perugia', 43.11072,  12.39083, 'Perugia, Italia'],
        ['Riccione', 43.99930,  12.65555, 'Riccione RN, Italia'],
        ['Alto adige', 46.78114,  11.29429, 'Cortina d Ampezzo BL, Italia'],
        ['Venezia', 46.03118, 12.35448, 'Venezia, Italia'],
        ['Curmayeur', 45.79692, 6.96896, 'Courmayeur AO, Italia'],
        ['Monaco', 48.13513,  11.58198, 'Monaco di Baviera, Germania'],
        ['Mancester', 53.48076,  -2.24263, 'Manchester, Regno Unito'],
        ['Isola Elba', 42.77819, 10.19274, 'Portoferraio, LI, Italia'],
        ['Porthsmouth', 50.81977,  -1.08798, 'Portsmouth, Regno Unito'],
        ['Barcellona', 41.38506, 2.17340, 'Barcellona, Spagna'],
        ['Lloret de Mar', 41.70055, 2.83981, 'Lloret de Mar, Spagna'],
        ['Nea kallikrateia', 40.31312, 23.06322, 'Nea Kallikratia 630 80, Grecia'],
        ['Firenze', 43.76956,  11.25581, 'Firenze, Italia'],
        ['Messina', 38.19381, 15.55402, 'Messina, Italia'],
        ['Siena', 43.31881,  11.33076, 'Siena SI, Italia'],
        ['Nizza', 43.71017,  7.26195, 'Nizza, Francia'],
        ['Oulu', 65.01209, 25.46508, 'Oulu, Finlandia'],
        ['Rovanieni', 66.543606, 25.846704, 'Rovaniemi, Finlandia'],
        ['Dublino', 53.34981,  -6.26031, 'Dublino, Irlanda'],
        ['Galway', 53.27067, -9.05679, 'Galway, Irlanda'],
        ['Folgaria', 45.91571, 11.17181, 'Folgaria TN, Italia'],
        ['Andalo', 46.16414, 11.00241, 'Andalo TN, Italia'],
        ['Cagliari', 39.22384, 9.12166, 'Cagliari, Italia'],
        ['Costa Rei', 39.25010, 9.57013, 'Costa Rei CA, Italia'],
        ['Costa Paradiso', 41.05607, 8.95397, 'Costa Paradiso OT, Italia'],
        ['Darwin', -12.46344, 130.84564, 'Darwin Territorio del Nord'],
        ['Alice Springs', -23.69804, 133.88075, 'Alice Springs, Territorio del Nord'],
        ['Uluru', -25.34443, 131.03688, 'Uluru, Petermann, Territorio del Nord'],
        ['Kata Tjuta', -25.35565,  130.84967, 'Uluru-Kata Tjuta National Park, Petermann, Territorio del Nord'],
        ['Treeways', -19.43698,  134.20829, 'Threeways Roadhouse, Tennant Creek NT'],
        ['Mont Isa', -20.72557, 139.49271, 'Città di Mount Isa Queensland 4825'],
        ['Camoweal', -19.92067,  138.12133, 'Camooweal Queensland 4828'],
        ['Deintree Rainforest', -16.08333, 145.48333, 'Daintree Rainforest, Cape Tribulation QLD'],
        ['Litchfield National Park', -13.29354,  130.84639, 'Litchfield National Park, NT'],
        ['Cairns', -16.919776, 145.778174, 'Cairns, Queensland'],
        ['Kakadu national park', -13.09229,  132.39377, 'Kakadu National Park, Kakadu Hwy, Jabiru NT 0886'],
        ['Mataranka', -14.92340, 133.06638, 'Mataranka Territorio del Nord 0852'],
        ['Cloncurry', -20.70639, 140.50933, 'Cloncurry Queensland 4824'],
        ['Julia Creek', -20.65619,  141.74422, 'Julia Creek Queensland 4823'],
        ['Hugheden', -20.85000,  144.20000, 'Hughenden QLD 4821'],
        ['Townsville', -19.25896, 146.81695, 'Townsville Queensland'],
        ['Arlie Beach', -20.26750,  148.71694, 'Airlie Beach, Queensland'],
        ['Cape Hillsborough National Park', -20.92416, 149.01684, 'Cape Hillsborough National Park, ,QLD'],
        ['Hervey Bay', -25.28815, 152.76766, 'Hervey Bay'],
        ['Sunshine Coast', -26.65000, 153.06667, 'Sunshine Coast, Queensland'],
        ['Gold Coast', -28.01667,  153.40000, 'Gold Coast Queensland'],
        ['Brisbane', -27.46977, 153.02512, 'Brisbane, Queensland']
];

//VIEW MODEL
var ViewModel = function() {
        var self = this
        var infowindow = null;
        self.infoMarker = null;
        self.reviews = ko.observableArray();
        self.location = ko.observableArray();
        self.resizeSelected = ko.observable();
        self.clickMarkerBool = false;

        // Google Maps Api to create the Map
        var centerMap = {lat: 45.79692, lng: 6.96896000};
        self.map = new google.maps.Map(document.getElementById('map'), {
            center: centerMap,
            zoom: 2
        });

        self.currMarkName = ko.observable();
        self.currMarkPos = ko.observable();
        self.infoVis = ko.observable(true);
        self.articleStrLink = ko.observableArray([]);
        self.urlName = ko.observable();
        self.urlLink = ko.observable();
        self.articleStrLink_access = ko.observableArray();

        self.cityfound = function(searchId,elem) {
            self.core(searchId, elem);
        };

        // Show wikipedia info about a clicked marker
        self.core = function(searchId, marker) {

            self.currMarkName(marker.name);
            self.currMarkPos(marker.position);
            self.articleStrLink_access([]);

            var $wikiElem = $('#wikipedia-links');
            $wikiElem.text("");
            var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + searchId + '&format=json&callback=wikiCallback';
            var wikiRequestTimeout = setTimeout(function(){
                $wikiElem.text("failed to get wikipedia resources");
            }, 2000);

            // Wikipedia Api to retrive wiki links about the marker
            $.ajax({
               url: wikiUrl,
               dataType: "jsonp",
               jsonp: "callback",
               }).done(function(response) {
                    var articleList = response[1];
                    for (var i = 0; i < articleList.length; i++) {
                        var articleStr = articleList[i];
                        var url = 'https://en.wikipedia.org/wiki/' + articleStr;
                        self.urlLink(url);
                        self.urlName(articleStr);
                        self.articleStrLink_access.push(
                            {
                                urlLink : self.urlLink(),
                                urlName : self.urlName(),
                            }
                        )
                    };
                    clearTimeout(wikiRequestTimeout);
            });

            var selectedMarker = null;

                                console.log("prova");

             // Add some info about the marker selected on a infowindow and in the page
            var onClickMarker = self.citiesmarkers().forEach(function(currentmarker) {

                if (currentmarker.infoId === marker.infoId) {
                    selectedMarker = currentmarker;
                    currentmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');

                    self.currMarkName(currentmarker.infoId);
                    self.currMarkPos(currentmarker.position);
                    self.infoVis(true);


                    if (self.clickMarkerBool === false){
                        self.map.setZoom(4);
                        self.map.setCenter(currentmarker.position);
                        if (infowindow) {
                            infowindow.close();
                        }
                        // Google Maps Street View Api used to fill an infowindow on the marker
                        var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + currentmarker.infoId + '';
                        infowindow = new google.maps.InfoWindow({
                        content:'<div id="content">'+
                                '<div id="siteNotice">'+
                                '<h2 id="firstHeading" class="firstHeading">City: ' + currentmarker.name + '</h2>' +
                                '</div>'+
                                '<div id="bodyContent">'+
                                '<img class="bgimg" src="' + streetviewUrl + '">'+
                                '<br>'+
                                '<h1>' + 'Position: ' + currentmarker.position + '</h1>'+
                                '</div>'+
                                '</div>'
                        });
                        infowindow.open(self.map, currentmarker);

                    }
                    else{
                    self.clickMarkerBool = false;}
                }
                else {
                    currentmarker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
                }
                if ((currentmarker.name == "Sydney") ||
                    (currentmarker.name == "Rome") ||
                    (currentmarker.name == "New York")) {
                    var image = {
                        url: 'http://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                        size: new google.maps.Size(20, 32),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(0, 32)
                    };
                currentmarker.setIcon(image);
                }
            });
        };

        self.citiesmarkers = new ko.observableArray();
        self.citiesfilter = ko.observable('');

        // Show only the results relative to the typing marker searched
        self.citiesfilter.subscribe(function(itemToSearch) {
            if (infowindow) {
                infowindow.close();
            }

            self.infoVis(false);

            itemToSearch = itemToSearch.toLowerCase();
            var bool = false;
            ko.utils.arrayForEach(self.citiesmarkers(),
                function(city)
                {
                    var cityLower = city.name.toLowerCase();
                    if (cityLower.search(itemToSearch) === -1) {
                            if (city.getVisible() === true) {
                                bool = true;}
                            city.setVisible(false);}
                    else {
                            if (city.getVisible() === false) {
                                bool = true;}
                            city.setVisible(true);} });
                if (bool === true) {
                        var checked = self.citiesmarkers().slice(0);
                        self.citiesmarkers([]);
                        self.citiesmarkers(checked);}
        });

        // Create a location with purpose (travel or live city), name (city),
        // latitude (city), longitude (city), search_id (id used to retrive information)
        self.createLocation = function(purpose, name, latitude, longitude, search_id) {
            var location = {
                position: new google.maps.LatLng(latitude, longitude),
                name: name,
                visible: true,
                map: self.map,
                infoId: search_id,
            };

            var image = {
                url: 'http://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
                size: new google.maps.Size(20, 32),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 32)
            };

            self.citiesmarkers.push(new google.maps.Marker(location));
            self.citiesmarkers()[self.citiesmarkers().length - 1].setAnimation(null);

            if (purpose=="travels")
                self.citiesmarkers()[self.citiesmarkers().length - 1].setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
            if (purpose=="life")
                self.citiesmarkers()[self.citiesmarkers().length - 1].setIcon(image);

            self.citiesmarkers()[self.citiesmarkers().length - 1].addListener('click', function() {
                if (infowindow) {
                    infowindow.close();
                }
                var marker = this;
                self.infoVis(true);
                // self.currMarkName(marker.infoId);
                // self.currMarkPos(marker.position);
                if (marker.getAnimation() !== null) {
                    marker.setAnimation(null);
                } else {
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(function() {
                        marker.setAnimation(null);
                        marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                    }, 1000);
                }

                // Google Maps Street View Api used to fill an infowindow on the marker
                var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=300x200&location=' + marker.infoId + '';
                infowindow = new google.maps.InfoWindow({
                    content: '<div id="content">'+
                                '<div id="siteNotice">'+
                                '<h2 id="firstHeading" class="firstHeading">City: ' + marker.name + '</h2>' +
                                '</div>'+
                                '<div id="bodyContent">'+
                                '<img class="bgimg" src="' + streetviewUrl + '">'+
                                '<br>'+
                                '<h1>' + 'Position: ' + marker.position + '</h1>'+
                                '</div>'+
                                '</div>'
                });

                infowindow.open(map, marker);
                self.clickMarkerBool=true;
                self.core(this.name, this);
            });
            return location;
        };

        

        // Use the arrays above to crate the markers
        for (var i = 0; i < travels.length; i++) {
            var t = travels[i];
            new self.createLocation("travels", t[0], t[1],t[2], t[3])
        }

        for (var i = 0; i < life.length; i++) {
            var t = life[i];
            new self.createLocation("life", t[0], t[1],t[2], t[3])
        }

        // Button to go back to initial map view
        self.resizeButtonClicked = function(){
            self.map.setZoom(2);
            self.map.setCenter(centerMap);
        }
    };


function googleError() {
    alert("error google script");
};

//Function to load map and start up app      
function init() {
    ko.applyBindings(new ViewModel());
};

