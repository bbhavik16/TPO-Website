mapboxgl.accessToken = 'pk.eyJ1IjoibmlzaHRhbiIsImEiOiJja3ZkcGNmZWg0d25wMm5xd2RkcDBzeHVsIn0.irJll1qHLs4XBFONtsVYFA';
const mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
mapboxClient.geocoding
.forwardGeocode({
query: 'Veermata Jijabai Technological Institute, Mumbai',
autocomplete: false,
limit: 1
})
.send()
.then((response) => {
if (
!response ||
!response.body ||
!response.body.features ||
!response.body.features.length
) {
console.error('Invalid response:');
console.error(response);
return;
}
const feature = response.body.features[0];
 
const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center: feature.center,
zoom: 15
});
// Add zoom and rotation controls to the map.
map.addControl(new mapboxgl.NavigationControl());
// create the popup
const popup = new mapboxgl.Popup({ offset: 23 }).setHTML(
'<br><h6>VJTI,Mumbai</h6>'
);
// Create a marker and add it to the map.
new mapboxgl.Marker().setLngLat(feature.center)
.setPopup(popup)
.addTo(map);
});