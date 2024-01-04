import React, { useContext, useEffect, useState } from "react";
import EasyCardPlaces from "./EasyCardPlaces";
import FeaturedPlaceCardEasyLayout from "./FeaturedPlaceCardEasyLayout";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { db } from "../Config/firebase";
import { Button } from "@nextui-org/react";
import { ShoppingIcon } from "../Assets/Icons/ShoppingIcon";
import { CoffeIcon } from "../Assets/Icons/CoffeIcon";
import { ParkIcon } from "../Assets/Icons/ParkIcon";
import { HotelIcon } from "../Assets/Icons/HotelIcon";
import { FavoriteIcon } from "../Assets/Icons/FavoriteIcon";
import { AuthContext } from "../Context/AuthContext";
export default function EasyLayout({ search }) {
  const [places, setPlaces] = useState([]);
  const [userPosition, setUserPosition] = React.useState({});
  const [featured, setFeatured] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [userLikes, setUserLikes] = useState([]);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    getPlacesData();
    getUserLocation();
    getUserLikes();
  }, []);

  useEffect(() => {
    searchPlaces();
  }, [search]);

  const searchPlaces = () => {
    if (search !== "") {
      const filteredPlaces = places.filter((place) =>
        place.placeName.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPlaces(filteredPlaces);
    } else if (search === "") {
      setFilteredPlaces(places);
    }
  };

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

  const getPlacesData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "AcceptedPlaces"));
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setPlaces(data);
      setFeaturedPlaces(data);
      setFilteredPlaces(data);
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

  // filtering places
  const filterPlaces = (type) => {
    setLikedPlaces([]);
    const filteredPlaces = places.filter((place) => place.placeType === type);
    setFilteredPlaces(filteredPlaces);
  };

  // filtering likes
  const filterLikes = () => {
    const likedPlaces = places.filter((place) => userLikes.includes(place.id));
    setFilteredPlaces(likedPlaces);
  };

  return (
    <>
      {search === "" && (
        <>
          <div className="w-full flex justify-center"></div>
          <h1 className="text-center font-bold text-3xl px-5 mt-12">
            الاعلى تقييما
          </h1>

          <div className="w-full flex justify-center gap-5 p-10 items-center mt-5 mb-5 flex-wrap max-sm:p-2">
            {featured.map((place, index) => {
              return (
                <FeaturedPlaceCardEasyLayout
                  placeImage={place.Images[0]}
                  placename={place.placeName}
                  key={index}
                  rating={place.avgRating}
                ></FeaturedPlaceCardEasyLayout>
              );
            })}
          </div>
        </>
      )}

      <div className="flex justify-center py-5 gap-3  flex-row-reverse overflow-x-visible flex-wrap">
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

      <div className="w-full flex justify-center items-center">
        <div className="w-full grid grid-cols-3  gap-4 p-20 max-sm:grid-cols-1 max-sm:p-6 max-lg:grid-cols-2">
          {filteredPlaces.map((place, index) => {
            return (
              <EasyCardPlaces
                key={index}
                placeData={place}
                userLocation={userPosition}
              ></EasyCardPlaces>
            );
          })}
        </div>
      </div>
    </>
  );
}
