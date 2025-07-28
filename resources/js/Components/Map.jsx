import "leaflet/dist/leaflet.css";

import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Circle, Tooltip, useMapEvents } from "react-leaflet";

import marker from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

export const Map = ({ coords, setCoords, mapPosition, mapHeight, mapZoom, editable, borderRadius }) => {
	const markerIcon = new Icon({
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [2, -40],
		iconUrl: marker,
		shadowUrl: markerShadow,
	})

	const MapEvents = () => {
		useMapEvents({
			click(e) {
				setCoords({ latitude: e.latlng.lat, longitude: e.latlng.lng });
			},
		});
		return false;
	};

	const { latitude, longitude } = coords;
	const fillBlueOptions = { fillColor: 'blue' };

	return (
		<>
			<MapContainer
				center={mapPosition}
				zoom={mapZoom}
				style={{ width: '100%', height: mapHeight, borderRadius: borderRadius }}
			>
				<TileLayer
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>

				{editable && (
					< MapEvents />
				)}

				{(latitude && longitude) && (
					<>
						<Marker position={[latitude, longitude]} icon={markerIcon} zIndexOffset={10} />
						<Circle center={[latitude, longitude]} pathOptions={fillBlueOptions} radius={50} >
							<Tooltip>Радиус от 50 метра</Tooltip>
						</Circle>
					</>
				)}
			</MapContainer>
			{/* {(
                // For Debuging
                <div>
                    <b>latitude</b>: {latitude?.toFixed(7)} <br />
                    <b>longitude</b>: {longitude?.toFixed(7)}
                </div>
            )} */}
		</>
	);
};