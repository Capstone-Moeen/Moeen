import React, { useEffect, useState, useContext } from "react";
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
import favorite from "../Assets/MapPins/favoritePin.svg";
import { db } from "../Config/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { Button } from "@nextui-org/react";
import { ShoppingIcon } from "../Assets/Icons/ShoppingIcon";
import { CoffeIcon } from "../Assets/Icons/CoffeIcon";
import { ParkIcon } from "../Assets/Icons/ParkIcon";
import { HotelIcon } from "../Assets/Icons/HotelIcon";
import { FavoriteIcon } from "../Assets/Icons/FavoriteIcon";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../Context/AuthContext";
function MapComponent({search}) {
  const { currentUser } = useContext(AuthContext);
  // Initializing the google maps with the api key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPVyiX5oN23vqvYmwilNu3zdeQ1yidLv0",
  });
  const [userPosition, setUserPosition] = React.useState({});
  const [mapRef, setMapRef] = React.useState();
  const [isOpen, setIsOpen] = useState(false);
  const [places, setPlaces] = useState([]);
  const [placeData, setPlaceData] = useState({});
  const [count, setCount] = useState(1);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getUserLikes();
    getUserLocation();
    getPlaces();
  }, [currentUser, count]);

  useEffect(() => {
    searchPlaces()
  },[search])

  //Getting places Data
  const getPlaces = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "AcceptedPlaces"));
      const placesData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlaces(placesData);
      setFilteredPlaces(placesData);
      setFeaturedPlaces(placesData);
    } catch (error) {
      console.log(error);
    }
  };

  // Getting user liked places
  const getUserLikes = async () => {
    try {
      const querySnapshot = await getDoc(doc(db, "users", currentUser.uid));
      const data = querySnapshot.data().favorites;
      setUserLikes(data);
    } catch (error) {
      console.log(error);
    }
  };

  const setFeaturedPlaces = (data) => {
    const filterFeatured = data.filter((place) => place.avgRating > 0);
    const featuredPlaces = filterFeatured.sort(
      (a, b) => b.avgRating - a.avgRating
    );
    setFeatured(featuredPlaces.slice(0, 2));
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

  // Storing the map reference in state to access it later
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

  // filtering places
  const filterPlaces = (type) => {
    setLikedPlaces([]);
    const filteredPlaces = places.filter((place) => place.placeType === type);
    setFilteredPlaces(filteredPlaces);
    mapRef.setZoom(11);
  };

  // filtering likes
  const filterLikes = () => {
    const likedPlaces = places.filter((place) => userLikes.includes(place.id));
    setLikedPlaces(likedPlaces);
    mapRef.setZoom(11);
  };

 
const searchPlaces = ()=>{
  if (search !== "") {
    const filteredPlaces = places.filter((place) =>
      place.placeName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPlaces(filteredPlaces);
    mapRef.setZoom(11);
  } else if(search === "") {
    setFilteredPlaces(places);
  }
}



  // rendering the map
  const renderMap = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className="h-screen">
        {!isLoaded ? (
          <div className="w-full h-full flex justify-center items-center">
            <CircularProgress size="lg" color="success" label="Loading..." />
          </div>
        ) : (
          <div style={{ height: "88vh" }}>

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
            <div className="flex justify-center py-3 gap-3  flex-row-reverse w-full">
              <div className="flex flex-row-reverse gap-2 flex-wrap justify-center ">
                <Button
                  className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn "
                  endContent={<ShoppingIcon size={22} />}
                  onClick={() => filterPlaces("shopping")}
                >
                  تسوق
                </Button>
                <Button
                  className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn "
                  endContent={<CoffeIcon size={22} />}
                  onClick={() => filterPlaces("cafe")}
                >
                  المقاهي
                </Button>
                <Button
                  className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn "
                  endContent={<ParkIcon size={22} />}
                  onClick={() => filterPlaces("park")}
                >
                  حدائق
                </Button>
                <Button
                  className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn "
                  endContent={<HotelIcon size={22} />}
                  onClick={() => filterPlaces("hotel")}
                >
                  فنادق
                </Button>

                <Button
                  className="w-32 h-8  font-bold text-[#B71F1F] bg-[#FAFAFB] text-lg filterBtn "
                  endContent={<FavoriteIcon size={22} />}
                  onClick={() => filterLikes()}
                >
                  المفضلة
                </Button>
                <Button
                  className="w-32 h-8  font-bold text-[#005B41] bg-[#FAFAFB] text-xl filterBtn"
                  onClick={() => {
                    setFilteredPlaces(places);
                    setLikedPlaces([]);
                  }}
                >
                  الكل
                </Button>
              </div>
            </div>

            {/* Mapping through places and placing marker for each place*/}
            {filteredPlaces.map((place) => {
              return (
                <Marker
                  onClick={() => handelMarkerClicked(place)}
                  key={place.id}
                  position={place.placeLocation}
                  icon={
                    likedPlaces.includes(place)
                      ? favorite
                      : place.placeType === "cafe"
                      ? cafe
                      : place.placeType === "hotel"
                      ? hotel
                      : place.placeType === "park"
                      ? park
                      : place.placeType === "shopping"
                      ? shopping
                      : place.placeType === "other"
                      ? other
                      : place.placeType === "restaurant"
                      ? restaurant
                      : favorite
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
                renderMap={renderMap}
              ></PlaceInfoSideCard>
            )}
            <FeaturedPlaces isOpen={isOpen} featured={featured}></FeaturedPlaces>
          </GoogleMap>
          </div>

        )}
      </div>
    </>
  );
}

export default MapComponent;
