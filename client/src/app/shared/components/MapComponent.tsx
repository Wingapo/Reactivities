import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type {LatLngExpression} from "leaflet";

type Props = {
  position: LatLngExpression;
  venue: string;
}

const MapComponent = ({position, venue}: Props) => {
  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{height:'100%'}}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{venue}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
