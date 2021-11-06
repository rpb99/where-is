import mapboxgl from "mapbox-gl";
import Geocoder from "react-mapbox-gl-geocoder";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  ScaleControl,
  Source,
  Layer,
  Popup,
} from "react-map-gl";
import React, { useEffect, useState } from "react";
import { url } from "inspector";

const Map: React.FC = () => {
  const mapAccess = {
    mapboxApiAccessToken: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
  };

  const queryParams = {
    country: "id",
  };

  interface ILocation {
    latitude: number;
    longitude: number;
  }

  interface IViewport extends ILocation {
    zoom: number;
    width: string;
    height: string;
  }

  interface ITempMarker extends ILocation {
    name?: string;
  }

  interface IGeoJSON extends ILocation {
    name?: string;
  }

  const [viewport, setViewport] = useState<IViewport>({
    width: "100%",
    height: "100vh",
    longitude: 103.1673,
    latitude: -0.3432,
    zoom: 2,
  });

  const geojson: IGeoJSON[] = [
    { name: "Warung Bu'de", longitude: -66.324462, latitude: -16.024695 },
    { name: "Warung Bu'de", longitude: 103.1673, latitude: -0.3432 },
    { name: "Warung Bu'de", longitude: -61.21582, latitude: -15.971891 },
  ];

  const [markers, setMarkers]: any = useState(geojson);

  const [tempMarker, setTempMarker]: any = useState({});

  const ListMarkers = () => (
    <>
      {markers.map((marker: any, idx: number) => (
        <Marker
          key={idx}
          longitude={marker.longitude}
          latitude={marker.latitude}
          onClick={() => {
            setTempMarker({});
            console.log(marker);
          }}
        >
          <div
            className=""
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "100%",
              backgroundImage: `url(https://placekitten.com/g/${Math.round(
                idx + 700
              )}/600`,
              backgroundSize: "100%",
            }}
          >
            {viewport.zoom > 11 && (
              <div
                style={{
                  color: "#2e2e2e",
                  fontSize: 11,
                  position: "absolute",
                  top: 25,
                  left: -10,
                }}
              >
                {marker.name}
              </div>
            )}
          </div>
        </Marker>
      ))}
    </>
  );

  const onClicked = (lngLat: number[]) => {
    setTempMarker({ name: "Gmo", longitude: lngLat[0], latitude: lngLat[1] });
    console.log(viewport.zoom);
  };
  const onSelected = (viewport: IViewport, item: any) => {
    setViewport(viewport);
    setTempMarker({
      name: item.place_name,
      longitude: item.center[0],
      latitude: item.center[1],
    });
    setMarkers((prevState: any) => [
      ...prevState,
      {
        name: item.place_name,
        longitude: item.center[0],
        latitude: item.center[1],
      },
    ]);
  };

  const onClose = () => {
    setTempMarker({});
  };

  const addMarker = () => {
    setMarkers((prevState: any) => [
      ...prevState,
      {
        name: "warunkQ",
        longitude: tempMarker.longitude,
        latitude: tempMarker.latitude,
      },
    ]);
  };
  return (
    <div>
      {/* Search locations input */}
      <Geocoder
        {...mapAccess}
        onSelected={onSelected}
        viewport={viewport}
        hideOnSelect={true}
        queryParams={queryParams}
      />

      <ReactMapGL
        {...mapAccess}
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport: IViewport) => setViewport(viewport)}
        onClick={({ lngLat }) => onClicked(lngLat)}
      >
        {Object.keys(tempMarker).length && (
          <>
            {/* Marker when clicked */}
            <Marker
              longitude={tempMarker.longitude}
              latitude={tempMarker.latitude}
              className="index"
            >
              <div className="marker temporary-marker">
                <span></span>
              </div>
            </Marker>

            {/* Popup when map clicked */}
            <Popup
              latitude={tempMarker.latitude}
              longitude={tempMarker.longitude}
              onClose={onClose}
              closeButton={true}
              closeOnClick={false}
              offsetTop={-30}
              className="index"
            >
              <p style={{ zIndex: 99 }} onClick={addMarker}>
                Add this place
              </p>
            </Popup>
          </>
        )}

        {/* render all markers */}
        {markers.length && <ListMarkers />}

        {/* Extra Config */}
        <NavigationControl
          style={{
            bottom: 0,
            right: 0,
            margin: 15,
          }}
        />
        <GeolocateControl
          style={{
            bottom: 100,
            right: 0,
            margin: 15,
          }}
        />
        <ScaleControl
          style={{
            top: 100,
            right: 0,
            margin: 15,
          }}
        />
      </ReactMapGL>
    </div>
  );
};

export default Map;
