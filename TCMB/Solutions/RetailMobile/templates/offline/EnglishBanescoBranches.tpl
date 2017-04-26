<div>
	<div id="map" style="height:100vh"></div>
	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCu7Hj-YJAiNdhAng61lk5aYyK7ekQwiLQ&libraries=places"></script>
	<script>
		$(function () {
			document.addEventListener("deviceready", onDeviceReady, false);

			function onDeviceReady() {
				var onSuccess = function (position) {

					var map, myLocation;

					map = new google.maps.Map(document.getElementById('map'), {
						/*center: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						},*/
						center: {
							lat: 8.991652,
							lng: -79.518935
						},
						zoom: 15
					});



					infowindow = new google.maps.InfoWindow();
					var placesService = new google.maps.places.PlacesService(map);
					placesService.textSearch({
						/*location: {
							lat: position.coords.latitude,
							lng: position.coords.longitude
						},*/
						location: {
							lat: 8.991652,
							lng: -79.518935
						},
						radius: 5000,
						query: 'banesco',
						type: ['bank']
					}, callback)

					function callback(results, status) {
						if (status == google.maps.places.PlacesServiceStatus.OK) {
							for (var i = 0; i < results.length; i++) {
								createMarker(results[i]);
							}
						}

						var destinations = results.map(function (place) {
							return place.geometry.location
						})
						var service = new google.maps.DistanceMatrixService();
						service.getDistanceMatrix({
							origins: [{
								lat: 8.991652,
								lng: -79.518935
							}],
							destinations: destinations,
							travelMode: 'DRIVING'
						}, aaaa);

						function aaaa(response, status) {
							response.rows[0].elements.sort(function (a,b){
								return a.distance.value > b.distance.value
							})
							console.log('distance response', response)
						}

					}

					function createMarker(place) {
						var placeLoc = place.geometry.location;
						var marker = new google.maps.Marker({
							map: map,
							position: place.geometry.location
						});

						google.maps.event.addListener(marker, 'click', function () {
							infowindow.setContent(place.name);
							infowindow.open(map, this);
						});
					}

				};

				navigator.geolocation.getCurrentPosition(onSuccess, function onError(error) {
					alert("Ocurrió un error ");
				});
			}
		})
	</script>

	<div>
		<br/>
		<div>
			<div class="ecDIB  Medium Size14 FullWidth" style="text-align: left; width: 49%;">
				<div style="color: #000; border: 1px solid #000; border-radius: 0px;">
					<p style="" class="DisplayBlock NoDecoration">CASA MATRIZ</p>
					<p style="{font=style:bold;align:right;float:right}">200 MTS</p>
					<p>MARBELLA, AVE.AQUILINO DE LA GUARDIA</p>
				</div>
			</div>
			<br/>
			<div class="ecDIB  Medium Size14 FullWidth" style="text-align: left; width: 49%;"> <br/>

				<div class="ecDIB  Medium Size14 FullWidth" style="text-align: left; width: 49%;">
					<div style="color: #000; border: 1px solid #000; border-radius: 0px;">
						<p style="" class="DisplayBlock NoDecoration">ALBROOK MALL</p>
						<p style="{font=style:bold;align:right;float:right}">750 MTS</p>
						<p>ALBROOK MALL, PASILLO DEL PINGUINO, PA-L9 Y PA-L10.</p>
					</div>
				</div>

				<div class="ecDIB  Medium Size14 FullWidth" style="text-align: left; width: 49%;">
					<BR/>
					<div style="color: #000; border: 1px solid #000; border-radius: 0px;">
						<p style="" class="DisplayBlock NoDecoration">ALTOS DE PANAMA</p>
						<p style="{font=style:bold;align:right;float:right}">2 KMS</p>
						<p>VIA RICARDO J.ALFARO, LOCALES 27 & 28</p>
					</div>
				</div>
			</div>

		</div>

	</div>