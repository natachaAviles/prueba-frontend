$(document).ready(function(){
	// TODO code
	ciudades = get_regiones();
	origen = $('#origen');
	destino = $('#destino');
	$.each(ciudades, function( index, value ) {

        origen.append($("<option />").val(index).text(ciudades[index].name));
    	destino.append($("<option />").val(index).text(ciudades[index].name));
		//console.log( index + ": " + ciudades[index].name );
	});
	$('#buscar').on('click', function(){ 
		calcularDistancia();
	});
	
});

function calcularDistancia(){
	//console.log("calculo distancia");
	ciudades = get_regiones();
	if($('#origen').val() !== 'null' && $('#destino').val() !== 'null'){
		jsonOrigen  = ciudades[$('#origen').val()];
		jsonDestino = ciudades[$('#destino').val()];

		var origin1 = new google.maps.LatLng(jsonOrigen.lat, jsonOrigen.long);
		var destinationB = new google.maps.LatLng(jsonDestino.lat, jsonDestino.long);

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		  {
		    origins: [origin1],
		    destinations: [destinationB],
		    travelMode: google.maps.TravelMode.DRIVING,
		  }, callback);
		//TODO cargar vehiculos.
		
}

function callback(response, status) {
	if (status == google.maps.DistanceMatrixStatus.OK) {
	    var origins = response.originAddresses;
	    var destinations = response.destinationAddresses;

	    for (var i = 0; i < origins.length; i++) {
	      var results = response.rows[i].elements;
	      for (var j = 0; j < results.length; j++) {
	        var element = results[j];
	        /*var distance = element.distance.text;
	        var duration = element.duration.text;
	        var from = origins[i];
	        var to = destinations[j];*/
	        console.log("distancia en metros: "+element.distance.value);
	        console.log("en KM "+ (element.distance.value/1000));
	        console.log("KM/Liros: "+11);
	        console.log("resultado: "+(element.distance.value/1000 /11));
	        console.log("multiplicar por valor litro y dividir por cantidad pasajeros, verificar que no sean 0 pasajeros");
	      }
	    }
	  }else{
	  	console.log("error :" + status);
	  }
	}
}
/*

*/