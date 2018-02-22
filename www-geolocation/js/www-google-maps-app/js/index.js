/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var map;

 function initMap(coords) {
     var uluru;
        if (coords == null) {
          uluru = {lat: -25.363, lng: 131.044};
        } else {
          uluru = coords
        }
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: uluru
        });
        var marker = new google.maps.Marker({
          position: uluru,
          map: map
        });
      }

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();

//ONCLICK EVENT
document.getElementById("buttonGet").addEventListener("click", codeAddress)



function codeAddress() {
    
    var geocoder = new google.maps.Geocoder();
    var marker;

    //GETTING THE ADDRESS FROM INPUT
    var address = document.getElementById( 'address' ).value;

    geocoder.geocode( { 'address' : address }, function( results, status ) {
        if( status == google.maps.GeocoderStatus.OK ) {

            var latlng = results[0].geometry.location;
            //SHOW LOACATION WITH MARKER ON MAP
            initMap(latlng);
            
        } else {
            alert( 'Geocode was not successful for the following reason: ' + status );
        }
            console.log(latlng);
        
        //GET LATITUDE AND LONGITUDE
        var lat = latlng.lat();
        var lng = latlng.lng();
        document.getElementById("printLatLng").innerHTML = "Latitude: " + lat.toString() + "<br>" + "Longitude: " + lng.toString();
        
    } );
        
}


//code partly taken from https://stackoverflow.com/questions/3926836/using-google-maps-api-v3-how-do-i-get-latlng-with-a-given-address/24519119