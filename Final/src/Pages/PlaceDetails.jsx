import React from 'react'
import {
    Button,
    CircularProgress,
  } from "@nextui-org/react";
  import { doc, getDoc } from "firebase/firestore";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { db } from '../Config/firebase';
import { useState , useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import Nav from '../Components/Nav';
import defaultMarker from "../Assets/MapPins/DefultPin.svg";



function PlaceDetails() {
    const {id}= useParams();
    const navigate = useNavigate(); // Using useNavigate hook to navigate
    const [placeDetails, setPlaceDetails] = useState(null);


// map
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyAPVyiX5oN23vqvYmwilNu3zdeQ1yidLv0",
      });

        //Storing the map reference in state to access it later
     const onMapLoad = (map) => {
    setMapRef(map);
  };
    const [mapRef, setMapRef] = React.useState();
    const [userPosition, setUserPosition] = useState({});
// 

    const [images, setImages] = useState([]);
    const handelImage = (e) => {
        const reader = new FileReader();
    
        setImagesObjects([...imagesObjects, e.target.files[0]]);
    
        reader.onload = (e) => {
          setImages([...images, e.target.result]);
        };
        reader.readAsDataURL(e.target.files[0]);
      };


    //   

// get data from firebase
useEffect(() => {
    const getPlaceDetails = async () => {
      const docRef = doc(db, 'placeRequest', id);
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        setPlaceDetails(docSnap.data());
      } else {
        console.log('No such document!');
      }
    };
  
    getPlaceDetails();
  }, [id]);

        

  return (
    
<>

   <Nav />
    <div className="w-full h-full overflow-auto text-right bg-[#FAFAFB]">
      <div className="w-full flex justify-center h-full items-center p-10 max-sm:p-3">
        <div className="w-[60%] shadow-lg py-10 rounded-lg bg-white max-sm:w-full max-sm:px-2">
          <div className="flex flex-col justify-start items-center text-center w-full">
            <h1 className="font-extrabold text-[2rem] text-black">
              طلب إضافة مكان جديد
            </h1>
            {placeDetails && (
              <div className="flex flex-col w-[85%] justify-center items-center pt-5 gap-5 max-sm:w-full ">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      اسم المكان
                    </span>
                  </div>
                  <div>{placeDetails.placeName}</div>
                </label>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-medium text-xl text-black ">
                      تصنيف المكان
                    </span>
                  </div>
                <div>
                {placeDetails.placeType}
                 </div>

                </label>
               
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      المنطقة{" "}
                    </span>
                  </div>
                <div>
                {placeDetails.placeRegion}
                </div>
                
                </label>
               
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      المدينة
                    </span>
                  </div>
                 <div>
                 {placeDetails.placeCity}
                 </div>
                </label>

                <div className="flex flex-col w-full text-start gap-4 pt-3 px-2 max-sm:gap-2">
                <h1 className="font-medium text-xl text-black">الخدمات المقدمة</h1>
                 <div>
                   {Object.entries(placeDetails.services).map(([service]) => (
                   <div key={service}>
                   <span>{service} </span>
                   </div>
                    ))}
                  </div>                   
                </div>

                <div className="flex flex-col w-full text-start gap-3 pt-3 px-2">
                  <h1 className="font-medium text-xl text-black ">
                     الموقع على الخريطة
                  </h1>
                  {!isLoaded ? (
                    <CircularProgress color="primary" />
                  ) : (
                    <>
                      <GoogleMap
                        zoom={16}
                        mapContainerClassName="requersFromMapContainer"
                        center={placeDetails.placeLocation}
                        mapContainerStyle={{
                          width: "100%",
                          height: "300px",
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
                      >
                        <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent">
                          <img
                            src={defaultMarker}
                            className="w-10 h-10"
                            alt="location"
                          />
                        </Button>
                      </GoogleMap>
                    </>
                  )}
                </div>

                <div className="flex flex-col w-full text-start gap-3 pt-3 px-2">
                  <h1 className="font-medium text-xl text-black">
                     صور المكان
                  </h1>
                  {placeDetails.Images && placeDetails.Images.map((imageSrc, index) => (
                   <img
                   key={index}
                    className="object-cover object-center rounded w-full"
                   src={imageSrc}
                   alt={`Image ${index + 1}`} 
                    />
                   ))}

                </div>
                <div className=' flex w-full justify-between'>

                <div className=' flex w-full gap-4'>

                <Button
                  className=" flex  justify-center items-center bg-[#005B41] text-white font-bold text-xl max-sm:text-base max-sm:w-[50%]"
                  size="lg"
                >
                  اضافة
                </Button>

                <Button
                  size="lg"
                  color="danger" variant="flat"
                  className=" text-2xl text-red-500"
                >
                  رفض
                </Button>
                </div>


                <div className=' flex w-full justify-end'>

                <Button
                
                  size="lg"
                  color="" variant="flat"
                  className=" text-2xl text-[#005B41] bg-[#FAFAFB]"
                  onClick={() => navigate('/Dashboard')}> 
                  الرجوع
                </Button>

                </div>
                </div>


              </div>
      )}

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaceDetails