/**
 * Created by Sachini on 12/5/2017.
 */
'use strict';

app.controller('App-controller-map',function ($scope,$http) {
    /**
     * http GET request to get all junction locations
     */
    $http.get('/location').then(function (response) {
        $scope.locations=response.data;
        console.log(response.data);
    });

    // var locations=$scope.locations;
    ///////////////////////////////
    var location1=
        {
            junction_id:"001",
            junction_name:"AA",
            lat:"6.955828",
            lang:"79.884022"
        }
    var location2=
        {
            junction_id:"002",
            junction_name:"BB",
            lat:"6.892297",
            lang:" 79.876929"
        }
    var location3=
        {
            junction_id:"003",
            junction_name:"CC",
            lat:"6.886874",
            lang:"79.887064"
        }

    var locations=[location1,location2,location3];
    //////////////////////////////

    /**
     * function to set markers to all locations and init with infoWindow
     */
    function setMarkers(map,locations) {
        for(var i=0;i<locations.length;i++){
            var lat=locations[i].lat;
            var lang=locations[i].lang;

            // /*set junction details*/
            // var id=locations[i].junction_id;
            // var name=locations[i].junction_name;

            var latlngset = new google.maps.LatLng(lat, lang);
            var marker = new google.maps.Marker({
                map: map, position: latlngset
            });
            map.setCenter(marker.getPosition());

            /*create infoWindow*/
            var infowindow = new google.maps.InfoWindow();

            /**load external html to the div*/
            $(document).ready(function()
            {
                $.get("../public/map-infoWindow.html", function(result)
                {
                    /**set content string to the info window*/
                    var content3=result;
                    infowindow.setContent('<div id="myInfoWinDiv">'+  content3+'</div>'); //wrap content to add js function

                },'html');
            });

            /*make infoWindow key*/
            marker.infowindow = infowindow;

            /*load infoWindow*/
            google.maps.event.addListener(marker, 'click', (function() {
                this.infowindow.open(map, this);
            }));
        }
    }

    /**
     * function to int map object
     */
    function initMap() {
        var myOptions = {
            center: new google.maps.LatLng(6.955828,79.884022),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var newMap = new google.maps.Map(document.getElementById("m_gmap_3"),
            myOptions);

        setMarkers(newMap, locations);
    }

    /**
     * function to init map- set markers- set infoWindow
     */
    $(function () {
        /*load map on winodow.load event*/
        google.maps.event.addDomListener(window, 'load', initMap);
    });

});

