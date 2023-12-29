import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { CircularProgress } from "@nextui-org/react";
import FilterBtns from "./FilterBtns";
import PlaceInfoSideCard from "./PlaceInfoSideCard";
import BackDrop from "./BackDrop";
import FeaturedPlaces from "./FeaturedPlaces";
import CoffePin from '../Assets/MapPins/CoffePin.svg'
import HotelPin from '../Assets/MapPins/HotelPin.svg'
import ParkPin from '../Assets/MapPins/ParkPin.svg'
import ShoppingPin from '../Assets/MapPins/shopPin.svg'
function MapComponent() {

  // Initializing the google maps with the api key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAPVyiX5oN23vqvYmwilNu3zdeQ1yidLv0',
  });
  const [userPosition, setUserPosition] = React.useState({});
  const [mapRef, setMapRef] = React.useState();
  const [isOpen, setIsOpen] = useState(false); 

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
    setIsOpen(true);
  };

  //This function will close the side card info on mobile
  const handelMobileColse = () => {
    setIsOpen(false);
  }
  return (
    <>
      <div className="h-screen">
        {!isLoaded ? (
          <div className="w-full h-full flex justify-center items-center">
            
            <CircularProgress size="lg" color="success" label="Loading..." />
          </div>
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
              icon={CoffePin}
            />
            <Marker
              position={{ lat: 24.7, lng: 46.68675486224617 }}
              icon={HotelPin}
            />
            <Marker
              position={{ lat: 24.71638356962413, lng: 46.64 }}
              icon={ParkPin}
            />
            <Marker
              position={{ lat: 24.7, lng: 46.64 }}
              icon={ShoppingPin}
            />
            
            <BackDrop handelBackDropClick={() => setIsOpen(false)} isOpen={isOpen}></BackDrop>
            <PlaceInfoSideCard isOpen={isOpen}></PlaceInfoSideCard>
            <FeaturedPlaces isOpen={isOpen}></FeaturedPlaces>
          </GoogleMap>
        )}
      </div>
    </>
  );
}

export default MapComponent;
