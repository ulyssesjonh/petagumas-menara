L.mapbox.accessToken = 'pk.eyJ1IjoidHJ5ZmF0dXIiLCJhIjoiY2lxdDJ5d3R1MDAydmZybmh3a3VtcmFvMiJ9.lL9RoXOtTscOHiSvOCrL-Q';

var map        = L.mapbox.map('map').setView([-1.1015078,113.8669906], 7);

var tileLayer  = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken);

var marker     = L.FeatureGroup();
var cluster    = L.markerClusterGroup();
var geojson;
var text;
var gumasLayer;

tileLayer.addTo(map);
L.MakiMarkers.accessToken = L.mapbox.accessToken;

function getKecamatanColor(nama_kec)
{
	if(nama_kec == "MANUHING")
	{   
		return '#ff0000';
	}else if(nama_kec == "MIHING RAYA")
	{
		return '#ff0040';
	}else if(nama_kec == "RUNGAN")
	{
		return '#ff0080';
	}else if(nama_kec == "KURUN")
	{
		return '#bf00ff';
	}else if(nama_kec == "RUNGAN HULU")
	{
		return '#4000ff';
	}else if(nama_kec == "MANUHING RAYA")
	{
		return '#0080ff';
	}else if(nama_kec == "TEWAH")
	{
		return '#00ffff';
	}else if(nama_kec == "KAHAYAN HULU UTARA")
	{
		return '#00ff40';
	}else if(nama_kec == "MIRI MANASA")
	{
		return '#ffff00';
	}else if(nama_kec == "DAMANG BATU")
	{
		return '#ffbf00';
	}else if(nama_kec == "RUNGAN BARAT")
	{
		return '#ff4000';
	}else{
					return 'white';
				}
}

function onEachFeature(feature, layer) 
{
	text = "<p><b>Nomor:</b></p>";
	text += "<p>" + feature.properties.id_site + "</p>";
	
	text += "<p><b>Site Name:</b></p>";
	text += "<p>" + feature.properties.nama_site + "</p>";
	
	text += "<p><b>Lokasi:</b></p>";
	text += "<p>" + feature.properties.lokasi + "</p>";
	text += "<p>" + "Kel." + feature.properties.kel + ", Kec. " + feature.properties.kec + "</p>";
	
	text += "<p><b>Nama Perusahaan:</b></p>";
	text += "<p>" + feature.properties.nama_perusahaan + "</p>";
	
	text += "<p><b>Tipe Menara:</b></p>";
	text += "<p>" + feature.properties.type_menara + "</p>";
	
	text += "<p><b>Tinggi Menara:</b></p>";
	text += "<p>" + feature.properties.tower_height + "</p>";

	layer.bindPopup(text);
}



$.getJSON('src/json/menara_data.json', function(data) {
	geojson = L.geoJson(data, {
		pointToLayer: function (feature, latlng) {
			return L.marker(latlng, {
				icon: L.MakiMarkers.icon({icon: "triangle", color: "#2095F2", size: "m"})
			});
		},
		onEachFeature: onEachFeature
	});

	// Clustering Pointer
	cluster.addLayer(geojson);
	map.addLayer(cluster);

	tileLayer.addTo(map);
});

function gumasStyle(feature){
				return {
					fillColor : getKecamatanColor(feature.properties.Kecamatan),
					weight : 2,
					opacity : 1,
					color : 'black',
					dashArray : 3,
					fillOpacity : 0.9,
					
					
				}
			}
gumasLayer = L.geoJson(
				gumas,
				{
					style : gumasStyle
				}
			).addTo(map);


			
map.attributionControl.addAttribution('Sumber Dinas Komunikasi Informatika Persandian Dan Statistik Kab. Gunung Mas');