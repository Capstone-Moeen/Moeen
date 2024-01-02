import React from "react";
import Nav from "../Components/Nav";
import {
  Tooltip,
  Button,
  Input,
  Checkbox,
  Select,
  SelectItem,
  CircularProgress,
  Image,
} from "@nextui-org/react";
import { useState } from "react";
import { SendIcon } from "../Assets/Icons/SendIcon";
import { AddIcon } from "../Assets/Icons/AddIcon";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect } from "react";
import defaultMarker from "../Assets/MapPins/DefultPin.svg";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../Config/firebase";
import { addDoc, collection } from "firebase/firestore";
import {useNavigate}  from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DeleteIcon} from "../Assets/Icons/DeleteIcon";

export default function NewRequest() {

  const navegate = useNavigate();

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAPVyiX5oN23vqvYmwilNu3zdeQ1yidLv0",
  });
  const [service, setService] = useState({});
  const [userPosition, setUserPosition] = useState({});
  const [mapRef, setMapRef] = React.useState();
  const [images, setImages] = useState([]);
  const [imagesObjects, setImagesObjects] = useState([]);
  const [userInput, setUserInput] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
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

  const handelService = (e) => {
    setService({ ...service, [e.target.name]: e.target.checked });
  };

  const handelInput = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handelImage = (e) => {
    const reader = new FileReader();

    setImagesObjects([...imagesObjects, e.target.files[0]]);

    reader.onload = (e) => {
      setImages([...images, e.target.result]);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handelSubmit = () => {
    if (userInput.placeName === "" || !userInput.placeName) {
      setError({ ...error, placeName: "هذا الحقل مطلوب" });
      return;
    } else if (userInput.placeType === "" || !userInput.placeType) {
      setError({ ...error, placeType: "هذا الحقل مطلوب" });
      return;
    } else if (userInput.placeRegion === "" || !userInput.placeRegion) {
      setError({ ...error, placeRegion: "هذا الحقل مطلوب" });
      return;
    } else if (userInput.placeCity === "" || !userInput.placeCity) {
      setError({ ...error, placeCity: "هذا الحقل مطلوب" });
      return;
    } else if (Object.keys(imagesObjects).length === 0) {
      setError({ ...error, image: "يجب إرفاق صورة واحدة على الاقل" });
      return;
    } else {
      setError({});
      setLoading(true);
      window.scrollTo(0, 0);
      uploadImages().then(async (imagesRes) => {
        await addDoc(collection(db, "placeRequest"), {
          placeName: userInput.placeName,
          placeType: userInput.placeType,
          placeRegion: userInput.placeRegion,
          placeCity: userInput.placeCity,
          services: service,
          Images: imagesRes,
          Status: 'waiting',
          placeLocation: mapRef.getCenter().toJSON(),
        })
          .then(() => {
            setLoading(false);
            navegate('/');            
          })
          .catch((error) => {
            setLoading(false);
            setError({
              ...error,
              generalError: "فشلت عملية رفع الطلب، الرجاء المحاولة مرة اخرى",
            });
          });
      });
    }
  };

  const uploadImage = async (image) => {
    const storageRef = ref(
      storage,
      `/placeImages/${userInput.placeName}_${new Date().getTime()}`
    );
    const response = await uploadBytes(storageRef, image);
    const url = await getDownloadURL(response.ref);
    return url;
  };

  const uploadImages = async () => {
    const imagesPromises = Array.from(imagesObjects, (image) =>
      uploadImage(image)
    );
    const imageRes = await Promise.all(imagesPromises);
    setLoading(false);
    toastSuccess();
    return imageRes;
  };

// toast functions
function toastSuccess() {
  toast.success('تم الارسال بنجاح', {
    position: "top-right",
   autoClose: 4000,
   hideProgressBar: false,
   closeOnClick: true,
   pauseOnHover: true,
   draggable: true,
   progress: undefined,
   theme: "light"
    });
}

//delete image
const handelDeleteImage = (index) => {
  const updatedImages = [...images];
  const updatedImagesObjects = [...imagesObjects];

  updatedImages.splice(index, 1);
  updatedImagesObjects.splice(index, 1);

  setImages(updatedImages);
  setImagesObjects(updatedImagesObjects);
};



  return (
    <>
    {/* <ToastContainer></ToastContainer> */}

      {loading && (
        <div className="w-full h-[300vh] max-sm:h-screen bg-black opacity-35 z-20 absolute top-0 left-0 flex justify-center 
        items-center ">
          <CircularProgress
            className="z-50"
            color="primary"
            label="Proccesing"
          ></CircularProgress>
        </div>
      )}

      <Nav />
      <div className="w-full h-full overflow-auto text-right bg-[#FAFAFB]">
        <div className="w-full flex justify-center h-full items-center p-10 max-sm:p-3">
          <div className="w-[60%] shadow-lg py-10 rounded-lg bg-white max-sm:w-full max-sm:px-2">
            <div className="flex flex-col justify-start  items-center text-center w-full">
              <h1 className="font-extrabold text-[2rem] text-black">
                طلب إضافة مكان جديد
              </h1>
              <p className="text-md pt-3 w-[85%] text-black max-sm:w-full">
                الرجاء تعبئة الأستبيان بمعلومات صحيحة ودقيقة، سيتم مراجعة جميع
                المعلومات قبل أضافة المكان.
              </p>

              <div className="flex flex-col w-[85%] justify-center items-center pt-5 gap-5 max-sm:w-full ">
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      اسم المكان
                    </span>
                  </div>
                  <Input
                    className={`w-full text-black  rounded-lg font-medium  border-none
                    placeholder-gray-400 text-sm  text-right`}
                    type="text"
                    color="primary"
                    variant="bordered"
                    placeholder=" ادخل اسم المكان"
                    name="placeName"
                    onChange={handelInput}
                  />
                </label>
                <span className="text-red-600 text-right">
                  {error.placeName}
                </span>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-medium text-xl text-black ">
                      تصنيف المكان
                    </span>
                  </div>
                  <Select
                    placeholder="اختر التصنيف"
                    color="primary"
                    variant="bordered"
                    className="border-none font-medium text-black"
                    aria-label="placeType"
                    name="placeType"
                    onChange={handelInput}
                  >
                    <SelectItem className="text-black" key="restaurant">
                      مطعم
                    </SelectItem>
                    <SelectItem className="text-black" key="park">
                      منتزه
                    </SelectItem>
                    <SelectItem className="text-black" key="cafe">
                      مقهى
                    </SelectItem>
                    <SelectItem className="text-black" key="shopping">
                      تسوق
                    </SelectItem>
                    <SelectItem className="text-black" key="فندق">
                      فندق
                    </SelectItem>
                    <SelectItem className="text-black" key="other">
                      أخرى
                    </SelectItem>
                  </Select>
                </label>
                <span className="text-red-600 text-right">
                  {error.placeType}
                </span>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      المنطقة{" "}
                    </span>
                  </div>
                  <Input
                    className={`w-full  rounded-lg font-medium  border-none
            placeholder-gray-400  text-black text-right`}
                    type="text"
                    color="primary"
                    variant="bordered"
                    placeholder=" ادخل اسم المنطقة"
                    name="placeRegion"
                    onChange={handelInput}
                  />
                </label>
                <span className="text-red-600 text-right">
                  {error.placeRegion}
                </span>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text-alt font-medium text-xl text-black">
                      المدينة
                    </span>
                  </div>
                  <Input
                    className={`w-full  rounded-lg font-medium  border-none
            placeholder-gray-400 text-black  text-right `}
                    type="text"
                    color="primary"
                    variant="bordered"
                    placeholder=" ادخل اسم المدينة"
                    name="placeCity"
                    onChange={handelInput}
                  />
                </label>
                <span className="text-red-600 text-right">
                  {error.placeCity}
                </span>

                <div className="flex flex-col w-full text-start gap-4 pt-3 px-2 max-sm:gap-2">
                  <h1 className="font-medium text-xl text-black">
                    الخدمات المقدمة
                  </h1>

                  <div className="w-full flex gap-44 px-3 max-sm:gap-5">
                    <div className=" flex flex-col gap-3">
                    <Checkbox
                        onChange={handelService}
                        defaultSelected={false}
                        className=" font-medium text-xl  text-black"
                        name="مواقف المقعدين"
                      >
                        <span className="mr-1"> مواقف المقعدين</span>
                      </Checkbox>
                      <Checkbox
                        onChange={handelService}
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                        name="المنحدرات"
                      >
                        <span className="mr-1">المنحدرات</span>
                      </Checkbox>
                      <Checkbox
                        onChange={handelService}
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"

                        name="طاولات الطعام"
                      >
                        <span className="mr-1"> طاولات الطعام</span>
                      </Checkbox>
                    </div>

                    <div className=" flex flex-col gap-3">
                      <Checkbox
                        onChange={handelService}
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                        name="دورات المياه"
                      >
                        <span className="mr-1"> دورات المياه</span>
                      </Checkbox>
                      <Checkbox
                        onChange={handelService}
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                        name="المصاعد"
                      >
                        <span className="mr-1"> المصاعد</span>
                      </Checkbox>
                      <Checkbox
                        onChange={handelService}
                        defaultSelected={false}
                        className=" font-medium text-xl text-black"
                        name="ابواب اوتوماتيكة"
                      >
                        <span className="mr-1"> ابواب اوتوماتيكة</span>
                      </Checkbox>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col w-full text-start gap-3 pt-3 px-2">
                  <h1 className="font-medium text-xl text-black ">
                    اختر الموقع على الخريطة
                  </h1>
                  {!isLoaded ? (
                    <CircularProgress color="primary" />
                  ) : (
                    <>
                      <GoogleMap
                        zoom={16}
                        mapContainerClassName="requersFromMapContainer"
                        center={userPosition}
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
                 <h1 className="font-medium text-xl text-black">إضافة صور للمكان</h1>
                 <div className={`images-container ${
                  images.length !== 0 ? "border" : ""
                  } border-[#005B41] w-full grid grid-cols-3 grid-rows-2 rounded-lg items-center p-1 gap-1 justify-items-center relative`}>
                 {images.map((image, index) => (
                 <div key={index} className="relative delete-button-container">
                   <img
                   className="object-fill object-center rounded w-full"
                   src={image}
                   alt={`Image ${index}`}
                   />
                   <button
                   className="delete-button"
                   onClick={() => handelDeleteImage(index)}
                    >
                   <DeleteIcon /> 
                   </button>
                 </div>
                  ))}
                 {images.length < 6 && (
                  <>
                  <input
                 type="file"
                 id="file"
                 style={{ display: "none" }}
                 accept=".jpg, .jpeg, .png"
                 onChange={handelImage}
                 />
                 <label
                   htmlFor="file"
                   className={`bg-[#005B41] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 max-sm:my-3 rounded p-2 ${
                   images.length >= 6 ? "hidden" : ""
                   }`}
                  >
                  <AddIcon size={24} color="white" />
                  </label>
                  </>
                  )}
               </div>
               <span className="text-red-600">{error.image}</span>
             </div>


                <div className="flex flex-col w-full text-start pt-3 px-2 ">
                  <Checkbox
                    defaultSelected
                    className=" font-medium text-xl text-black"
                  >
                    أوافق على
                    <span className="text-[#005B41]"> الشروط والأحكام </span>
                    وسياسة
                    <span className="text-[#005B41]"> الخصوصية</span>
                  </Checkbox>
                </div>

                <div className=" flex justify-center gap-5 w-full max-sm:flex-col max-sm:px-10">

                <Button
                  className=" flex  justify-center items-center bg-[#005B41] text-white font-bold text-xl w-[25%] mt-3 max-sm:text-base max-sm:w-full"
                  endContent={<SendIcon size={24} />}
                  size="lg"
                  variant="flat"
                  onClick={handelSubmit}
                >
                  ارسال
                </Button>

                <Button
                  size="lg"
                  variant="flat"
                  className=" flex  justify-center items-center text-[#005B41] bg-[#f2f3f5ff] font-bold text-xl w-[25%] mt-3 max-sm:text-base max-sm:w-full"
                  onClick={() => navegate('/')}> 
                  الرجوع
                </Button>


                </div>



              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}






