import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { CircularProgress } from "@nextui-org/react";
import FilterBtns from "./FilterBtns";
import PlaceInfoSideCard from "./PlaceInfoSideCard";
import BackDrop from "./BackDrop";
import FeaturedPlaces from "./FeaturedPlaces";
import cafe from "../Assets/MapPins/CoffePin.svg";
import hotel from "../Assets/MapPins/HotelPin.svg";
import park from "../Assets/MapPins/ParkPin.svg";
import shopping from "../Assets/MapPins/shopPin.svg";
import other from "../Assets/MapPins/DefultPin.svg";
import restaurant from "../Assets/MapPins/resturantPin.svg";
import { db } from "../Config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function MapComponent() {
  // Initializing the google maps with the api key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPVyiX5oN23vqvYmwilNu3zdeQ1yidLv0",
  });
  const [userPosition, setUserPosition] = React.useState({});
  const [mapRef, setMapRef] = React.useState();
  const [isOpen, setIsOpen] = useState(false);
  const [places, setPlaces] = useState([]);
  const [placeData, setPlaceData] = useState({});
  const [mapPin, setMapPin] = useState();
  useEffect(() => {
    getUserLocation();
    getPlaces();
  }, []);

  //Getting places Data
  const getPlaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "AcceptedPlaces"));
      const placesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlaces(placesData);
    } catch (error) {
      console.log(error);
    }
  };

  // Getting the user current location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  };

  //Storing the map reference in state to access it later
  const onMapLoad = (map) => {
    setMapRef(map);
  };

  // Handling the marker click event
  const handelMarkerClicked = (place) => {
    setPlaceData(place);
    mapRef.panTo(place.placeLocation);
    mapRef.setZoom(16);
    setIsOpen(true);
  };

  // This function will close the side card info on mobile
  const handelMobileColse = () => {
    setIsOpen(!isOpen);
  };

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

            {/* Mapping through places and placing marker for each place*/}
            {places.map((place) => {
              return (
                <Marker
                  onClick={() => handelMarkerClicked(place)}
                  key={place.id}
                  position={place.placeLocation}
                  icon={
                    place.placeType === "cafe"
                      ? cafe
                      : place.placeType === "hotel"
                      ? hotel
                      : place.placeType === "park"
                      ? park
                      : place.placeType === "shopping"
                      ? shopping
                      : place.placeType === "other"
                      ? other
                      : restaurant
                  }
                ></Marker>
              );
            })}

            <BackDrop
              handelBackDropClick={() => setIsOpen(false)}
              isOpen={isOpen}
            ></BackDrop>
            {isOpen && (
              <PlaceInfoSideCard
                placeData={placeData}
                isOpen={isOpen}
                userLocation={userPosition}
                handelMobileColse={handelMobileColse}
              ></PlaceInfoSideCard>
            )}

            <FeaturedPlaces isOpen={isOpen}></FeaturedPlaces>
          </GoogleMap>
        )}
      </div>
    </>
  );
}

export default MapComponent;
