function initMap() {
  var laboratoriaLima ={lat:-12.1191427, lng:-77.0349046};
  var map = new google.maps.Map(document.getElementById("map"),{ zoom:18, center:laboratoriaLima});

  var markadorLaboratoria = new google.maps.Marker({
    position:laboratoriaLima,
    map: map
  });

  function buscar (){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(funcionExito, funcionError);
    }
  }

  var latitud, longitud, miUbicacion;
  var funcionExito= function(position){
    latitud= position.coords.latitude;
    longitud= position.coords.longitude;

    miUbicacion= new google.maps.Marker({
      position: {lat:latitud, lng:longitud},
      map: map
    });

    map.setZoom(18);
    map.setCenter({lat: latitud, lng: longitud});
  };


  var funcionError= function (error) {
    alert("tenemos un problema con encontrar tu ubicaciòn");
  };

  document.getElementById("encuentrame").addEventListener("click",buscar);

  var inputPartida = document.getElementById("partida");
  var inputDestino = document.getElementById("destino");

  new google.maps.places.Autocomplete(inputPartida);
  new google.maps.places.Autocomplete(inputDestino);

  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer;

  var calculateAndDisplayRoute = function (directionsService, directionsDisplay){
    directionsService.route({
      origin: inputPartida.value,
      destination: inputDestino.value,
      travelMode: 'DRIVING'
    }, function(response, status){
      if (status === 'OK'){
        var distancia= Number((response.routes[0].legs[0].distance.text.replace("km","")).replace(",","."));
        tarifa.classList.remove("none");
        var costo = distancia * 1.75;
        console.log(costo);
        if (costo<4){
          tarifa.innerHTML= "S/. 4";
        }

        tarifa.innerHTML= "S/. " + parseInt(costo);

        console.log(response.routes[0].legs[0].distance.text);
        directionsDisplay.setDirections(response);

        miUbicacion.setMap(null);
        console.log(miUbicacion);
      } else {
        window.alert("No encontramos una ruta.");
      }
    });

  };
  directionsDisplay.setMap(map);
  var trazarRuta = function(){
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  document.getElementById("trazar-ruta").addEventListener("click", trazarRuta);

};
