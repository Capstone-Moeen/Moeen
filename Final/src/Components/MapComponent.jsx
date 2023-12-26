import React, { useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { CircularProgress } from "@nextui-org/react";

import FilterBtns from "./FilterBtns";
function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_TOKEN,
  });
  const [userPosition, setUserPosition] = React.useState({});

  // Getting the user current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  return (
    <>
      <div className=" h-[100vh] ">
        {!isLoaded ? (
          <CircularProgress color="success" label="Loading..." />
        ) : (
          <GoogleMap
            zoom={13}
            center={userPosition}
            mapContainerClassName="map-container"
            mapContainerStyle={{
              position: "relative",
            }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              mapId: "a128fd791f572fa9",
            }}
          >
            <FilterBtns></FilterBtns>
          </GoogleMap>
        )}
      </div>
    </>
  );
}

export default MapComponent;
