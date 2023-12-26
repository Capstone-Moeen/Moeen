import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { CircularProgress } from "@nextui-org/react";
import FilterBtns from "./FilterBtns";
import PlaceInfoSideCard from "./PlaceInfoSideCard";

function MapComponent() {
  // Initializing the google maps with the api key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLEMAPS_API_TOKEN,
  });
  const [userPosition, setUserPosition] = React.useState({});
  const [mapRef, setMapRef] = React.useState();
   const [isOpen, setIsOpen] = useState(false)
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

  //Storing the map reference in state to access it later
  const onMapLoad = (map) => {
    setMapRef(map);
  };
  // Handling the marker click event
  const handelMarkerClicked = (pos) => {
    mapRef.panTo(pos);
    mapRef.setZoom(16);
    setIsOpen(true)
  };

  return (
    <>
      <div className=" h-[100vh] ">
        {!isLoaded ? (
        <div className="w-full h-full flex justify-center items-center"> <CircularProgress size="lg" color="success" label="Loading..." /></div>  
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
            onLoad={onMapLoad}
            onClick={() => setIsOpen(false)}
          >
            <FilterBtns></FilterBtns>
            <Marker
              onClick={() => {
                handelMarkerClicked({
                  lat: 24.71638356962413,
                  lng: 46.68675486224617,
                });
              }}
              position={{ lat: 24.71638356962413, lng: 46.68675486224617 }}
              icon={"https://i.postimg.cc/Cx28dtGc/CoffePin.png"}
            />
            <Marker
              position={{ lat: 24.7, lng: 46.68675486224617 }}
              icon={"https://i.postimg.cc/SsSm4Qn3/HotelPin.png"}
            />
            <Marker
              position={{ lat: 24.71638356962413, lng: 46.64 }}
              icon={"https://i.postimg.cc/xd9wJx9b/ParkPin.png"}
            />
            <Marker
              position={{ lat: 24.7, lng: 46.64 }}
              icon={"https://i.postimg.cc/VLQmsF0X/shopPin.png"}
            />
        <PlaceInfoSideCard isOpen={isOpen}></PlaceInfoSideCard>
          </GoogleMap>
        )}
      </div>
    </>
  );
}

export default MapComponent;
